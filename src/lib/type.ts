// {
//     "submissionCount": 0,
//     "sampleSize": 1000,
//     "amount": "1",
//     "id": 1,
//     "title": "Hello World",
//     "options": [
//         {
//             "id": 1,
//             "image_url": "https://d2lff49aaqvgse.cloudfront.net/thumbnails/1/0.6351422598355172/image.jpg",
//             "task_id": 1
//         },
//         {
//             "id": 2,
//             "image_url": "https://d2lff49aaqvgse.cloudfront.net/thumbnails/1/0.8962186123806086/image.jpg",
//             "task_id": 1
//         }
//     ]
// }

export interface Option {
  id: number;
  image_url: string;
  task_id: number;
}

export interface Task {
  id: number;
  title: string;
  options: Option[];
}
