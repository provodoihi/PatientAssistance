export const API_List_Company = {
  login: 'http://172.18.1.16:8080/api/auth/signin',
  signup: 'http://172.18.1.16:8080/api/auth/signup',
  findLocation: 'http://172.18.1.16:8080/api/public/hospitalclinic',
  filterLocation:
    'http://172.18.1.16:8080/api/public/hospitalclinic/find?keyword=',
  myProfile: 'http://172.18.1.16:8080/api/profile/myProfile',
  appointmentGeneral: 'http://172.18.1.16:8080/api/appointments/',
  appointmentFindPatient: 'http://172.18.1.16:8080/api/appointments/patient/',
  appointmentFindClinic: 'http://172.18.1.16:8080/api/appointments/clinic/',
  question: 'http://172.18.1.16:8080/api/patient/question/',
  answerPatient: 'http://172.18.1.16:8080/api/patient/answer/',
  questionListAdvisor: 'http://172.18.1.16:8080/api/advisor/question/',
  answerAdvisor: 'http://172.18.1.16:8080/api/advisor/answer/',
};
