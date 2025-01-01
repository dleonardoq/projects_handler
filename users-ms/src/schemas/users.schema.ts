import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Users {
  @Prop({ required: true })
  document_type: string;

  @Prop({ required: true })
  document_number: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  birth_date: Date;

  @Prop({ required: false, default: true, type: Boolean })
  active: boolean;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  password: string;

  @Prop({ required: true, default: Date.now })
  created_at: Date;
}

const UsersSchema = SchemaFactory.createForClass(Users);

UsersSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    delete ret.active;
    return ret;
  },
});

export { UsersSchema };
