import { Controller, Get, Header, Param, Res } from '@nestjs/common';
import { RssService } from './rss.service';

@Controller()
export class RssController {
    constructor(private readonly rssService: RssService) {
    }

    @Get('feeds')
    @Header('content-type', 'text/xml')
    public getHello(@Res() response): any {
        return this.rssService.getHello(response);
    }

    @Get('feeds/:id')
    public getFeedDetail(@Param('id') feedId: string): string {
        return feedId;
    }

}
