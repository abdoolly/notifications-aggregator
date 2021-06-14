# Notification Aggregator

A backend system implemented in Nest js to get notification data and aggregate it.

## Prerequisite

    - docker
    - npm
    - node

## Installation

```bash
$ npm install
```

## Running the app

run the database and phpMyAdmin containers

```
$ docker-compose up -d
```

then

```
$ npm run start:prod
```

## API documentation

If you run the app by the steps above you can go to this link to find a swagger documentation
[http://localhost:3000/docs](http://localhost:3000/docs)

Also this is a postman collection for the endpoints
[https://www.getpostman.com/collections/cdd3f8e5325af3b9ad3f](https://www.getpostman.com/collections/cdd3f8e5325af3b9ad3f)

### GET /:postId

An api to get get the notifications by post Id.

#### Request details

| name     | type   | example                            | description                           |
| -------- | ------ | ---------------------------------- | ------------------------------------- |
| postId   | string | `7d78ff348647b782cb3027d836d23e09` | the post to get the notifications for |
| page     | number | 1                                  | page number                           |
| pageSize | number | 4                                  | number of items in a page             |

#### Example request

```
GET http://localhost:3000/7d78ff348647b782cb3027d836d23e09?page=1&pageSize=4
```

#### Example response

```
{
    "statusCode": 200,
    "body": {
        "docs": [
            {
                "type": "Comment",
                "read": 0,
                "post": {
                    "id": "7d78ff348647b782cb3027d836d23e09",
                    "title": "How to professionally administrate seamless growth strategies in 10 steps"
                },
                "comment": {
                    "id": "ad4a3b31161e4391a161ff40e0faf122",
                    "commentText": "this is my first comment"
                },
                "user": {
                    "id": "084300a01df3060f41fad4700a70b6fe",
                    "name": "Eugenio Bertè"
                }
            },
            {
                "type": "Comment",
                "read": 1,
                "post": {
                    "id": "7d78ff348647b782cb3027d836d23e09",
                    "title": "How to professionally administrate seamless growth strategies in 10 steps"
                },
                "comment": {
                    "id": "a09a31d93656489ea818a42169898152",
                    "commentText": "this is my first comment"
                },
                "user": {
                    "id": "084300a01df3060f41fad4700a70b6fe",
                    "name": "Eugenio Bertè"
                }
            },
            {
                "type": "Comment",
                "read": 1,
                "post": {
                    "id": "7d78ff348647b782cb3027d836d23e09",
                    "title": "How to professionally administrate seamless growth strategies in 10 steps"
                },
                "comment": {
                    "id": "1afcfd42308e4de9907abc859f7f13a4",
                    "commentText": "this is a sample comment"
                },
                "user": {
                    "id": "084300a01df3060f41fad4700a70b6fe",
                    "name": "Eugenio Bertè"
                }
            },
            {
                "type": "Comment",
                "read": 1,
                "post": {
                    "id": "7d78ff348647b782cb3027d836d23e09",
                    "title": "How to professionally administrate seamless growth strategies in 10 steps"
                },
                "comment": {
                    "id": "60b9bded945d4f5196f46de20f04c800",
                    "commentText": "this is my first comment"
                },
                "user": {
                    "id": "084300a01df3060f41fad4700a70b6fe",
                    "name": "Eugenio Bertè"
                }
            }
        ],
        "pages": 4,
        "total": 16,
        "next": 2,
        "prev": null,
        "first": 1,
        "last": 4
    }
}
```

### Post /:postId

An api to add a notification item either a comment or like

#### Request details

| name        | type   | example                            | description                                            |
| ----------- | ------ | ---------------------------------- | ------------------------------------------------------ |
| type        | string | 'Like' or 'Comment'                | the notification type                                  |
| userId      | string | `084300a01df3060f41fad4700a70b6fe` | the userId that made that notification                 |
| commentText | string | `this is a comment`                | the comment text only required if the type was Comment |

#### Example request to make a comment notification

```
POST http://localhost:3000/7d78ff348647b782cb3027d836d23e09
{
    "type": "Comment",
    "userId": "084300a01df3060f41fad4700a70b6fe",
    "commentText": "this is my first comment"
}
```

#### Response

```
{
    "statusCode": 200,
    "body": {
        "id": "085888d8d2b9492aace092da664fa268",
        "notificationType": "Comment",
        "postId": "7d78ff348647b782cb3027d836d23e09",
        "userId": "084300a01df3060f41fad4700a70b6fe",
        "isRead": false,
        "comment": {
            "id": "ad4a3b31161e4391a161ff40e0faf122",
            "commentText": "this is my first comment",
            "postId": "7d78ff348647b782cb3027d836d23e09",
            "userId": "084300a01df3060f41fad4700a70b6fe"
        },
        "updatedAt": "2021-06-14T03:32:53.887Z",
        "createdAt": "2021-06-14T03:32:53.887Z",
        "commentId": "ad4a3b31161e4391a161ff40e0faf122"
    }
}
```

#### Example request to make a Like notification

```
POST http://localhost:3000/7d78ff348647b782cb3027d836d23e09
{
    "type": "Like",
    "userId": "084300a01df3060f41fad4700a70b6fe"
}
```

#### Response

```
{
    "statusCode": 200,
    "body": {
        "id": "cbbd770eff224e7e89c3dc64c556c9ac",
        "notificationType": "Like",
        "postId": "7d78ff348647b782cb3027d836d23e09",
        "userId": "084300a01df3060f41fad4700a70b6fe",
        "isRead": false,
        "updatedAt": "2021-06-14T02:46:45.538Z",
        "createdAt": "2021-06-14T02:46:45.538Z"
    }
}
```

### Put /:postId

An api to update the notification feed of a post to be marked as read.

#### Request details

| name   | type   | example                            | description                             |
| ------ | ------ | ---------------------------------- | --------------------------------------- |
| postId | string | `7d78ff348647b782cb3027d836d23e09` | the postId to mark it's feed to be read |

#### Example request

```
PUT http://localhost:3000/7d78ff348647b782cb3027d836d23e09
```

#### Response

```
{
    "statusCode": 200,
    "body": "all post notifications are now marked as read"
}
```
