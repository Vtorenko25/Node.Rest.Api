import joi from "joi";

export class PostValidator {
    private static  title = joi.string().min(5).max(50).required().trim();
    private static  content = joi.string().min(5).required().trim();

    public static create = joi.object({
        title: this.title,
        content: this.content,
    });
    public static update = joi.object({
        title: this.title,
        content: this.content,
    });
}


