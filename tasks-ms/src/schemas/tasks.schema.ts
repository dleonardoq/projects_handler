import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { taskStatus } from 'src/config/taskStatus';

@Schema()
export class Task {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  project_code: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  limit_date: Date;

  @Prop({ required: false, default: true, type: Boolean })
  active: boolean;

  @Prop({ required: true })
  status: taskStatus;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
