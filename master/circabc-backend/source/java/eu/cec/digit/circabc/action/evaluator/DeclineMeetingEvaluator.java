/*******************************************************************************
 * Copyright 2006 European Community
 *
 *  Licensed under the EUPL, Version 1.1 or - as soon they
 *  will be approved by the European Commission - subsequent
 *  versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the
 *  Licence.
 *  You may obtain a copy of the Licence at:
 *
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in
 *  writing, software distributed under the Licence is
 *  distributed on an "AS IS" basis,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *  express or implied.
 *  See the Licence for the specific language governing
 *  permissions and limitations under the Licence.
 ******************************************************************************/
package eu.cec.digit.circabc.action.evaluator;

import eu.cec.digit.circabc.service.event.MeetingRequestStatus;
import org.alfresco.web.bean.repository.Node;


/**
 * Evaluate if the current user can reject a meeting. It means check if it is not already done.
 *
 * @author Yanick Pignot
 */
public class DeclineMeetingEvaluator extends AcceptMeetingEvaluator {

    private static final long serialVersionUID = -216436852785621419L;

    public boolean evaluate(final Node node) {
        final MeetingRequestStatus userStatus = getCurrentUserStatusOnMeeting(node);

        if (userStatus == null) {
            return false;
        } else {
            return !userStatus.equals(MeetingRequestStatus.Rejected);
        }

    }

}
