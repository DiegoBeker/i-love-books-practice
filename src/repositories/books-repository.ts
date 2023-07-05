import { Book, CreateBook } from "../protocols/book";
import { CreateReview } from "../protocols/review";

import connection from "../database";
import prisma from "../database";

export async function getBooks() {
  const result = await prisma.books.findMany();
  return result;
}

export async function getBook(id: number) {
  const result = await prisma.books.findFirst({ where: { id } });
  return result;
}

export async function createBook(book: CreateBook) {
  const { title, author, publisher, purchaseDate } = book;
  const date = new Date(purchaseDate);
  await prisma.books.create({ data: { title, author, publisher, purchaseDate: date } });
}

export async function reviewBook(bookReview: CreateReview) {
  const { bookId, grade, review } = bookReview;
  await prisma.books.update({ data: { grade, review, read: true }, where: { id: bookId } });
}