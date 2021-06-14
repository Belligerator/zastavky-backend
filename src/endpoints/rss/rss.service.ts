import { Injectable } from '@nestjs/common';
const RSS = require('rss');
const fs = require('fs');

@Injectable()
export class RssService {


    public feed =  new RSS({
        title: 'Muj feed',
        description: 'Muj prvni rss feed.',
        feed_url: 'http://belligerator.cz:5015/api/feeds',
        site_url : 'http://belligerator.cz',
    });

    constructor() {
        this.feed.item({
            title: 'Feed 1',
            description : 'Feed 1 popis',
            url : 'http://belligerator.cz:5015/api/feeds/1',
            guid : new Date().getTime() + '',
            date: new Date(),
        });
    }

    public getHello(response): any {
        var xml = this.feed.xml({indent: true});
        console.log(xml);
        response.send(xml);
    }

}
