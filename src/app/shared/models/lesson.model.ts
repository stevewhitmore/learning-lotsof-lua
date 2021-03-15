import { TopicModel } from '.';

export interface LessonModel extends TopicModel {
  quizId: number;
}
