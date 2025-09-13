import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import Content from './contentModel';

export const contentCreate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(createHttpError(400, result.array()[0]?.msg));
    }

    const content = new Content(req.body);
    await content.save();

    res.status(201).json({
      message: 'content create success fully!!!',
      data: { contentDto: content },
    });
  } catch (error) {
    next(error);
  }
};

export const getContents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const contents = await Content.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: 'fetch contents successfully!!',
      data: { contentDto: contents },
    });
  } catch (err) {
    next(err);
  }
};

export const getSingleContent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return next(createHttpError(404, 'content not found!!'));
    }
    res.status(200).json({
      message: 'fetch content successfully!!',
      data: { contentDto: content },
    });
  } catch (err) {
    next(err);
  }
};

export const updateContent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(createHttpError(400, result.array()[0]?.msg));
    }
    const updatedContent = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    if (!updatedContent) {
      return next(createHttpError(404, 'content not found!!'));
    }
    res.status(200).json({
      message: 'update content successfully!!',
      data: { contentDto: updatedContent },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deletedContent = await Content.findByIdAndDelete(req.params.id);
    if (!deletedContent) {
      return next(createHttpError(404, 'content not found!!'));
    }
    res.status(200).json({
      message: 'delete content successfully!!',
      data: { contentDto: deletedContent },
    });
  } catch (error) {
    next(error);
  }
};
