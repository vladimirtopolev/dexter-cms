import * as mongoose from 'mongoose';
import {Model, Schema} from 'mongoose';

export interface PageEntityDocument extends mongoose.Document{
    title: string,
    content: any,
    parentPath: any,
    locale: string
}

export const PageEntitySchema = new Schema<PageEntityDocument>({
    title: String,
    parentPath: Schema.Types.ObjectId,
    content: Schema.Types.Mixed,
    locale: String
});

export const PageEntityModel: Model<PageEntityDocument> = mongoose.model('Page', PageEntitySchema);

