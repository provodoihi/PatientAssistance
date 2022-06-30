import axios from 'axios';
import {types, Instance, flow} from 'mobx-state-tree';
import {API_LIST} from '../utils';

export type QuestionSubmitType = {
  userId: string | number;
  fullname: string;
  phone: string;
  questionDetail: string;
};

export const Question = types
  .model({
    id: types.maybeNull(types.union(types.string, types.number)),
    userId: types.maybeNull(types.union(types.string, types.number)),
    fullname: types.maybeNull(types.string),
    phone: types.maybeNull(types.string),
    questionDetail: types.maybeNull(types.string),
  })
  .actions(() => ({
    askQuestion: flow(function* (
      token: string,
      questionData: QuestionSubmitType,
    ) {
      try {
        let response = yield axios.post(API_LIST.question, questionData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    }),
  }));

const AnswerData = types.model({
  id: types.maybeNull(types.union(types.string, types.number)),
  userId: types.maybeNull(types.union(types.string, types.number)),
  questionId: types.maybeNull(types.union(types.string, types.number)),
  questionDetail: types.maybeNull(types.string),
  answerDetail: types.maybeNull(types.string),
});

export const Answer = types
  .model({
    answerList: types.array(AnswerData),
    singleAnswer: types.optional(AnswerData, {}),
    responseStatus: types.maybeNull(types.number),
  })
  .actions(self => ({
    getAnswerList: flow(function* (token: string) {
      try {
        let response = yield axios.get(API_LIST.answerPatient, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          self.answerList = response.data;
          self.responseStatus = response.status;
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    }),
  }));

export type QuestionType = Instance<typeof Question>;
export type AnswerType = Instance<typeof AnswerData>;
