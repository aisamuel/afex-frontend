export interface Giphy {
  data: GiphyData[],
  pagination: GiphyPagination

}

export interface GiphyData {
    id: string;
    slug: string;
    import_datetime: string;
    is_sticker: number;
    rating: string;
    source: string;
    source_post_url: string;
    source_tld: string;
    title: string;
    trending_datetime: string;
    type: string;
    url: string;
    username: string;
}

export interface GiphyPagination {
  count: number;
  offset: number;
  total_count: number
}
// export class Giphy {
//     id: string;
//     slug: string;
//     import_datetime: string;
//     is_sticker: number;
//     rating: string;
//     source: string;
//     source_post_url: string;
//     source_tld: string;
//     title: string;
//     trending_datetime: string;
//     type: string;
//     url: string;
//     username: string;
//     constructor(giphy) {
//       {
//         this.id = giphy.id || this.getRandomID();
//         this.slug = giphy.slug|| '';
//         this.import_datetime = giphy.import_datetime || '';
//         this.is_sticker = giphy.is_sticker || '';
//         this.rating = giphy.rating || '';
//         this.source = giphy.source || '';
//         this.source_post_url = giphy.source_post_url || '';
//         this.source_tld = giphy.source_tld || '';
//         this.title = giphy.title || '';
//         this.trending_datetime =  giphy.trending_datetime || '';
//         this.type = giphy.type || '';
//         this.url = giphy.url || '';
//         this.username = giphy.username || '';

//       }
//     }

    
//     public getRandomID(): string {
//       const S4 = () => {
//         return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
//       };
//       return S4() + S4();
//     }
//   }