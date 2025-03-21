import { HttpException, HttpStatus } from "@nestjs/common";

// Exceção para pageToken inválido ou expirado
export class InvalidPageTokenException extends HttpException {
  constructor() {
    super('A solicitação especifica um token de página inválido.', HttpStatus.BAD_REQUEST);
  }
}

// Exceção para erros genéricos da API do YouTube
export class YoutubeApiErrorException extends HttpException {
  constructor(message: string) {
    super(`Erro na API do Youtube: ${message}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

// Exceção para quando o parâmetro "query" não é fornecido
export class MissingQueryParameterException extends HttpException {
  constructor() {
    super('O parâmetro "query" é obrigatório.', HttpStatus.BAD_REQUEST);
  }
}

// Exceção para quando a cota de requisições à API do YouTube é excedida
export class QuotaExceededException extends HttpException {
  constructor() {
    super('A solicitação não pode ser concluída porque você excedeu sua cota.', HttpStatus.TOO_MANY_REQUESTS);
  }
}

// Exceção para quando a chave de API é inválida ou não tem permissão
export class UnauthorizedException extends HttpException {
  constructor() {
    super('A chave de API é inválida ou sem permissão para acessar o recurso.', HttpStatus.UNAUTHORIZED);
  }
}

// Exceção para quando um vídeo expetifico não é encontrado
export class VideoNotFoundException extends HttpException {
  constructor(query: string) {
    super(`Vídeo com a query "${query}" não foi encontrado.`, HttpStatus.NOT_FOUND);
  }
}