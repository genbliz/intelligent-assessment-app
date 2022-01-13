import { BaseDataService } from "../../services/base-data-service";
import { IBook, IBookComment, IComment } from "./book-types";

class BookDataServiceBase extends BaseDataService {
  private readonly BASE_URL_PART = "books";

  async getList() {
    return await this.getApi<IBook[]>({
      url: `${this.BASE_URL_PART}`,
    });
  }

  async search(searchTerm: string) {
    return await this.getApi<IBook[]>({
      url: `${this.BASE_URL_PART}/search`,
      params: { searchTerm },
    });
  }

  async getById(bookId: string) {
    return await this.getApi<IBookComment>({
      url: `${this.BASE_URL_PART}/${bookId}`,
    });
  }

  async comment({
    bookId,
    comment,
  }: {
    comment: string;
    bookId: number | string;
  }) {
    const result = await this.postApi<IComment>({
      url: `${this.BASE_URL_PART}/${bookId}/comment`,
      data: { comment },
    });
    return result;
  }
}

export const BookDataService = new BookDataServiceBase();
