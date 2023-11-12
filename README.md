# Blurhash microservice
#### Video Demo: https://youtu.be/cbLgWB0isoE
#### Description:
A microservice that takes an image from a URL and responds with the respective blurhash. It allows developers to improve the user experience by providing image placeholders with a blurry color representation of the image during loading. It can also help create blurred backgrounds for images with different aspect ratios, such as a vertically oriented image on a landscape.



## API Reference

#### Generate blurhash

```http
  POST /blurhash
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `imageUrl` | `string` | **Required**. Url of image to generate blurhash from |



## Authors

- [@GrzywN](https://www.github.com/GrzywN)


## Demo

[Youtube](https://youtu.be/cbLgWB0isoE)


## FAQ

#### Is this microservice fast enough to generate blurhashes on the fly?

The algorithm is quite resource-intensive for high-resolution images, so in this case it is recommended to use it after uploading the image to the server. For such images, it can take up to several seconds to generate a single blurhash. For this reason, the microservice already includes a Redis database for caching requests. For low-resolution images, on the other hand, the blurhash is generated instantly.

#### What is the blur factor?

Currently, a blur factor of 5 for both x and y is used in the project, and if it is changed, it cannot be greater than 9.
## Feedback

If you have any feedback, please reach out to me at karolbinkowski3@proton.me


## Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?

I learned how to use buffers and fixed-size arrays in JavaScript. In addition, in my project, I used a caching database for the first time and used Docker to configure it. It was also my first time using the new JavaScript runtime that is Bun. 
## License

[MIT](https://choosealicense.com/licenses/mit/)


## Roadmap

- Adding .env for blur factor defaults

- Adding support for dynamic blur factor property

- Adding support for no-cache option

- Adding support for bulk image uploads

- Adding view with example blurfactor from image

- Long-term maintenance of the current code base
## Run Locally

Clone the project

```bash
  git clone git@github.com:GrzywN/blurhash-ms.git
```

Go to the project directory

```bash
  cd blurhash-ms
```

Install dependencies and start the server via Docker

```bash
  docker-compose up -d --build
```

And the bun server should be running on localhost:3000.
## Tech Stack

**Server:** Bun

**Database:** Redis

**Code quality:** Prettier

**Other:** Docker, docker-compose, Git


## Running Tests

To run tests, run the following command

```bash
  bun test
```

## Usage/Examples

### CURL

```bash
curl -X POST -H "Content-Type: application/json" -d '{"imageUrl": "https://picsum.photos/200"}' http://localhost:3000/blurhash
```

### Axios

```javascript
const axios = require("axios");

const imageUrl = "https://picsum.photos/200";

axios
  .post("http://localhost:3000/blurhash", { imageUrl })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

```

### Fetch API

```javascript
const imageUrl = "https://picsum.photos/200";

fetch("http://localhost:3000/blurhash", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ imageUrl }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });

```
