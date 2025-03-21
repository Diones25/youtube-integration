import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidPageTokenException extends HttpException {
  constructor() {
    super('O pageToken fornecido é invalido ou expirado.', HttpStatus.BAD_REQUEST);
  }
}

export class YoutubeErrorException extends HttpException {
  constructor(message: string) {
    super(`Erro na API do Youtube: ${message}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}