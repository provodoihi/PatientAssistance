export const API_List = {
  login: 'http://192.168.1.7:8080/api/auth/signin',
  signup: 'http://192.168.1.7:8080/api/auth/signup',
  findLocation: 'http://192.168.1.7:8080/api/public/hospitalclinic',
  filterLocation:
    'http://192.168.1.7:8080/api/public/hospitalclinic/find?keyword=',
  myProfile: 'http://192.168.1.7:8080/api/profile/myProfile',
  appointmentGeneral: 'http://192.168.1.7:8080/api/appointments/',
  appointmentFindPatient: 'http://192.168.1.7:8080/api/appointments/patient/',
  appointmentFindClinic: 'http://192.168.1.7:8080/api/appointments/clinic/',
  question: 'http://192.168.1.7:8080/api/patient/question/',
  answerPatient: 'http://192.168.1.7:8080/api/patient/answer',
  questionListAdvisor: 'http://192.168.1.7:8080/api/advisor/question',
  answerAdvisor: 'http://192.168.1.7:8080/api/advisor/answer/',
};
