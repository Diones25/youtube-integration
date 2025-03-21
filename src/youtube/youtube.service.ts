import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { InvalidPageTokenException, YoutubeApiErrorException } from './exceptions/youtube.exceptions';

@Injectable()
export class YoutubeService {
  private readonly apiKey: string | undefined;
  private readonly apiUrl: string = 'https://www.googleapis.com/youtube/v3/search';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('YOUTUBE_API_KEY');
  }

  async searchVideos(query: string, maxResults: number = 10, pageToken?: string): Promise<any> {
    const params = {
      part: 'snippet',
      q: query,
      maxResults: maxResults,
      key: this.apiKey,
      pageToken: pageToken || undefined,
    };

    try {
      const response = await axios.get(this.apiUrl, { params });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        const youtubeError = error.response.data.error;

        //Verifica se o erro é relacionado a um pageToken inválido
        if (youtubeError.errors.some((err) => err.reason === 'invalidPageToken')) {
          throw new InvalidPageTokenException();          
        }

        //Outros erros de API do Youtube
        throw new YoutubeApiErrorException(youtubeError.message);
      }

      // Erros genéricos (ex: prblemas de rede)
      throw new YoutubeApiErrorException('Erro ao se conectar à API do Youtube');
    }
  }
}
