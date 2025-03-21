import { Controller, Get, Query } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) { }

  @Get('search')
  async search(
    @Query('query') query: string,
    @Query('maxResults') maxResults: number = 10,
    @Query('pageToken') pageToken?: string
  ) {
    
    if (!query) {
      return { error: 'Query parameter is required' };
    }

    return this.youtubeService.searchVideos(query, maxResults, pageToken);
  }
}
