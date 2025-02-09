/**
 * CIRCABC REST API
 * This is the first version of the CIRCABC REST API used by the new User Interface
 *
 * The version of the OpenAPI document: 4.1.4
 * Contact: DIGIT-CIRCABC-SUPPORT@ec.europa.eu
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { DateInfo } from './dateInfo';
import { RepeatsInfo } from './repeatsInfo';
import { AttendantsInfo } from './attendantsInfo';

/**
 * definition of an event or meeting. Used to create and retrieve information about it
 */
export interface EventDefinition {
  appointmentTypeEvent: boolean;
  id?: string;
  igId?: string;
  title: string;
  dateInfo: DateInfo;
  language: string;
  timezone: string;
  eventAbstract?: string;
  invitationMessage?: string;
  location?: string;
  repeatsInfo: RepeatsInfo;
  attendantsInfo: AttendantsInfo;
  enableNotification?: boolean;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactUrl?: string;
  meetingPublicAvailability: boolean;
  meetingOrganisation?: string;
  meetingAgenda?: string;
  meetingType: EventDefinition.MeetingTypeEnum;
  meetingLibrarySection?: string;
  eventType: EventDefinition.EventTypeEnum;
  eventPriority: EventDefinition.EventPriorityEnum;
}
export namespace EventDefinition {
  export type MeetingTypeEnum =
    | 'FaceToFace'
    | 'VirtualMeeting'
    | 'ElectronicWithConnectixVideoPhone'
    | 'ElectronicWithEnhancedSeeYou_SeeMe'
    | 'ElectronicWithInternetVideoPhone'
    | 'ElectronicWithIntelProshare'
    | 'ElectronicWithMicrosoftNetMeeting'
    | 'ElectronicWithNetscapeConference'
    | 'ElectronicWithNetscapeCooltalk'
    | 'ElectronicWithVDOnetVDOPhone'
    | 'ElectronicWithotherSoftware';
  export const MeetingTypeEnum = {
    FaceToFace: 'FaceToFace' as MeetingTypeEnum,
    VirtualMeeting: 'VirtualMeeting' as MeetingTypeEnum,
    ElectronicWithConnectixVideoPhone: 'ElectronicWithConnectixVideoPhone' as MeetingTypeEnum,
    ElectronicWithEnhancedSeeYouSeeMe: 'ElectronicWithEnhancedSeeYou_SeeMe' as MeetingTypeEnum,
    ElectronicWithInternetVideoPhone: 'ElectronicWithInternetVideoPhone' as MeetingTypeEnum,
    ElectronicWithIntelProshare: 'ElectronicWithIntelProshare' as MeetingTypeEnum,
    ElectronicWithMicrosoftNetMeeting: 'ElectronicWithMicrosoftNetMeeting' as MeetingTypeEnum,
    ElectronicWithNetscapeConference: 'ElectronicWithNetscapeConference' as MeetingTypeEnum,
    ElectronicWithNetscapeCooltalk: 'ElectronicWithNetscapeCooltalk' as MeetingTypeEnum,
    ElectronicWithVDOnetVDOPhone: 'ElectronicWithVDOnetVDOPhone' as MeetingTypeEnum,
    ElectronicWithotherSoftware: 'ElectronicWithotherSoftware' as MeetingTypeEnum,
  };
  export type EventTypeEnum = 'Task' | 'Appointment' | 'Other';
  export const EventTypeEnum = {
    Task: 'Task' as EventTypeEnum,
    Appointment: 'Appointment' as EventTypeEnum,
    Other: 'Other' as EventTypeEnum,
  };
  export type EventPriorityEnum = 'Low' | 'Medium' | 'High' | 'Urgent';
  export const EventPriorityEnum = {
    Low: 'Low' as EventPriorityEnum,
    Medium: 'Medium' as EventPriorityEnum,
    High: 'High' as EventPriorityEnum,
    Urgent: 'Urgent' as EventPriorityEnum,
  };
}
