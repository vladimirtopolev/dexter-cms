import * as mongoose from 'mongoose';
import {Model, Schema} from 'mongoose';

export interface PageEntityDocument extends mongoose.Document{
    title: string,
    content: any,
    parentPath: any,
    locale: string
    path: string
}

export const PageEntitySchema = new Schema<PageEntityDocument>({
    title: String,
    parentPath: Schema.Types.ObjectId,
    content: Schema.Types.Mixed,
    path: String,
    locale: String
});

export const PageEntityModel: Model<PageEntityDocument> = mongoose.model('Page', PageEntitySchema);

