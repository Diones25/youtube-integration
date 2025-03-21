import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { HttpExceptionFilter } from './libs/filters/http-exception.filter';


@Controller('youtube')
@UseFilters(HttpExceptionFilter) // aplica o filtro de exceções a todas as rotas deste controller
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
