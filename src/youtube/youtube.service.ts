import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class YoutubeService {
  private readonly apiKey: string | undefined;
  private readonly apiUrl: string = 'https://www.googleapis.com/youtube/v3/search';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('YOUTUBE_API_KEY');
  }

  async searchVideos(query: string, maxResults: number = 10): Promise<any> {
    const params = {
      part: 'snippet',
      q: query,
      maxResults: maxResults,
      key: this.apiKey,
    };

    try {
      const response = await axios.get(this.apiUrl, { params });
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar vídeos no Youtube');
    }
  }
}
