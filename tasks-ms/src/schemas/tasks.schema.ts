import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { taskStatus } from 'src/config/taskStatus';

@Schema()
export class Task {
  @Prop({ required: true, unique: true })
  code: string = '';

  @Prop({ required: true })
  project_code: string = '';

  @Prop({ required: true })
  title: string = '';

  @Prop({ required: false })
  description: string = '';

  @Prop({ required: true })
  limit_date: Date = new Date();

  @Prop({ required: false, default: true, type: Boolean })
  active: boolean = true;

  @Prop({ required: true })
  status: taskStatus = taskStatus.PENDING;

  @Prop({ default: Date.now })
  created_at: Date = new Date();
}

const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.set('toJSON', {
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    delete ret.active;
    return ret;
  },
});

export { TaskSchema };
