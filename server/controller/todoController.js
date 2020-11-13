import Todo from '../models/todoModel.js';
import asyncHandler from 'express-async-handler';

export const addNewTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (title.trim() === '' || description.trim() === '') {
    res.status(404);
    throw new Error('Title or Description can not be blank!');
  } else {
    const todo = await Todo.create({
      title,
      description,
    });
    if (todo) {
      res.status(201).json(todo);
    } else {
      res.status(404);
      throw new Error('Item not added!');
    }
  }
});

export const getAllTodo = asyncHandler(async (req, res) => {
  const todos = await Todo.find({});
  if (todos) {
    res.status(200).json(todos);
  } else {
    res.status(404);
    throw new Error('Items not fetched!');
  }
});

export const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (todo) {
    const updatedItems = await Todo.findByIdAndRemove(req.params.id);
    if (updatedItems) {
      res.status(200).json(updatedItems);
    }
  } else {
    res.status(404);
    throw new Error('Items not found!');
  }
});

export const completeTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (todo) {
    todo.done = true;
    const updatedTodo = await todo.save();
    if (updatedTodo) {
      res.status(200).json(updatedTodo);
    }
  } else {
    res.status(404);
    throw new Error('Items not found!');
  }
});

export const incompleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (todo) {
    todo.done = false;
    const updatedTodo = await todo.save();
    if (updatedTodo) {
      res.status(200).json(updatedTodo);
    }
  } else {
    res.status(404);
    throw new Error('Items not found!');
  }
});

export const editTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (todo) {
    const { title, description } = req.body;
    if (title.trim() === '' || description.trim() === '') {
      res.status(404);
      throw new Error('Title or Description can not be blank!');
    } else {
      todo.title = title || todo.title;
      todo.description = description || todo.description;
      const updatedTodo = await todo.save();
      if (updatedTodo) {
        res.status(200).json(updatedTodo);
      }
    }
  } else {
    res.status(404);
    throw new Error('Items not found!');
  }
});
