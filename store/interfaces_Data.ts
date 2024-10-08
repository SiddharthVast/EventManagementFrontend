export interface College {
  id: number;
  collegeName: string;
  number: string;
  emailId: string;
  address: string;
}
export interface CollegeData {
  id?: number;
  collegeName: string;
  number: string;
  emailId: string;
  address: string;
}
interface UserImpData {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  courseName?: string;
  role: string;
}
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;
  details: string;
  courseName: string;
  role: string;
  college: College;
}
export interface UserData {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;
  details: string;
  courseName: string;
  role: string;
  collegeId: number;
}
export interface Festival {
  id: number;
  festivalTitle: string;
  startDate: string;
  endDate: string;
}

export interface FestivalData {
  id?: number;
  festivalTitle: string;
  startDate: string;
  endDate: string;
  collegeId?: number;
}

export interface Festival {
  id: number;
  festivalTitle: string;
  startDate: string;
  endDate: string;
  photo: string;
  description: string;
  collegeId?: number;
}

export interface FestivalData {
  id?: number;
  festivalTitle: string;
  startDate: string;
  endDate: string;
  photo: string;
  description: string;
  collegeId?: number;
}
export interface PointsToJudge {
  id: number;
  point: string;
  event: Event;
}
export interface PointsToJudgeData {
  id?: number;
  point: string;
  event: Event;
}
export interface Event {
  id: number;
  eventType: string;
  eventName: string;
  members: string;
  venue: string;
  startDateTime: string;
  endDateTime: string;
  festivalId: number;
  status: string;
}
export interface EventData {
  id?: number;
  eventType: string;
  eventName: string;
  members: string;
  venue: string;
  startDateTime: string;
  endDateTime: string;
  festivalId: number;
}