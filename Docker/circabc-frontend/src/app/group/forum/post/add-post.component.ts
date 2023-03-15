import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import {
  ActionEmitterResult,
  ActionResult,
  ActionType,
} from 'app/action-result';
import {
  Comment,
  Node as ModelNode,
  UserService,
} from 'app/core/generated/circabc';
import { PostService } from 'app/core/generated/circabc/api/post.service';
import { TopicService } from 'app/core/generated/circabc/api/topic.service';
import { Quote } from 'app/core/ui-model/index';
import { getUserFullName } from 'app/core/util';

@Component({
  selector: 'cbc-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  preserveWhitespaces: true,
})
export class AddPostComponent implements OnInit, OnChanges {
  @Input()
  topic!: ModelNode;
  @Input()
  futureQuote!: Quote;
  @Input()
  editPost: ModelNode | undefined;
  @Output()
  readonly postedComment = new EventEmitter<ActionEmitterResult>();

  public addPostForm!: FormGroup;
  public showForm = false;
  public posting = false;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private topicService: TopicService,
    private translateService: TranslateService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.addPostForm = this.fb.group(
      {
        text: ['', Validators.required],
      },
      {
        updateOn: 'change',
      }
    );
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.futureQuote) {
      if (changes.futureQuote.currentValue !== undefined) {
        const quoting = await this.translateService
          .get('label.quoting')
          .toPromise();
        const authorFullName = await getUserFullName(
          changes.futureQuote.currentValue.author as string,
          this.userService
        );
        const text = `<br/><br/><p>${quoting}: ${authorFullName}
        </p><blockquote>${changes.futureQuote.currentValue.text}</blockquote>`;
        if (this.addPostForm) {
          this.addPostForm.patchValue({ text });
          this.showForm = true;
        }
      }
    } else if (changes.editPost) {
      if (changes.editPost.currentValue !== undefined) {
        const text = changes.editPost.currentValue.properties.message;
        if (this.addPostForm) {
          this.addPostForm.patchValue({ text });
          this.showForm = true;
        }
      }
    } else if (changes.topic) {
      this.resetForm();
    }
  }

  public resetForm() {
    this.showForm = false;
    this.editPost = undefined;
    this.addPostForm.reset();
  }

  public async addPost() {
    if (this.addPostForm.valid) {
      this.posting = true;
      const body: Comment = {
        ...this.addPostForm.value,
      };

      const result: ActionEmitterResult = {};
      result.type = ActionType.CREATE_POST;

      try {
        if (this.topic.id) {
          await this.topicService.postReply(this.topic.id, body).toPromise();
          result.result = ActionResult.SUCCEED;
          this.addPostForm.reset();
          this.showForm = false;
        }
      } catch (exception) {
        result.result = ActionResult.FAILED;
      }
      this.posting = false;
      this.postedComment.emit(result);
    }
  }

  public async updatePost() {
    if (this.addPostForm.valid) {
      this.posting = true;

      const result: ActionEmitterResult = {};
      result.type = ActionType.EDIT_POST;

      if (this.editPost && this.editPost.properties) {
        this.editPost.properties.message = this.addPostForm.value.text;

        try {
          if (this.editPost.id) {
            await this.postService
              .putPost(this.editPost.id, this.editPost)
              .toPromise();
            result.result = ActionResult.SUCCEED;
            this.addPostForm.reset();
            this.showForm = false;
          }
        } catch (exception) {
          result.result = ActionResult.FAILED;
        }
        this.posting = false;
        this.postedComment.emit(result);
      }
    }
  }
}
