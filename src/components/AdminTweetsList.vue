<template>
  <div class="tweet-wrapper">
    <div v-for="tweet in tweets" :key="tweet.id">
      <div class="tweet-content">
        <img class="tweet-user-photo" :src="tweet.avatar" alt="" />
        <div class="tweet">
          <div class="tweet-user">
            <span class="tweet-user-name">{{ tweet.name }}</span>
            <span class="tweet-user-info"
              >{{ tweet.account }}・{{ tweet.createdAt | fromNow }}</span
            >
          </div>
          <div class="tweet-description">{{ tweet.description }}</div>
        </div>
        <button>
          <img src="./../assets/icon_close.svg" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const dummyTweets = [
  {
    id: 1,
    UserId: 1,
    description: 'eveniet',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 0,
    replyCount: 0,
    isLiked: 0,
    User: {
      id: 1,
      name: 'Robert Stroman',
      account: 'user1',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=19.49557651044964',
    },
    time: 'about 2 hours',
  },
  {
    id: 2,
    UserId: 1,
    description:
      'Assumenda fugiat a doloribus architecto est exercitationem.\nEst deserunt dolorem expedita est saepe quas.\nQuia excepturi qui repudiandae odit.\nId libero a maiores aut neque eos nostrum quas.\nEt consequatur consequuntur est.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 0,
    replyCount: 1,
    isLiked: 0,
    User: {
      id: 1,
      name: 'Robert Stroman',
      account: 'user1',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=19.49557651044964',
    },
    time: 'about 2 hours',
  },
  {
    id: 3,
    UserId: 6,
    description: 'distinctio',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 1,
    replyCount: 1,
    isLiked: 0,
    User: {
      id: 6,
      name: 'Ashley Ondricka',
      account: 'user6',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=26.314776042720133',
    },
    time: 'about 2 hours',
  },
  {
    id: 4,
    UserId: 5,
    description:
      'Itaque suscipit dicta magnam cumque incidunt. Similique maxime sed animi distinctio. Autem nesciunt autem laborum cum explicabo autem debitis ipsa quos.\n \rSunt placeat harum dolores rerum quam hic et voluptates consequatur. Quam est natus omnis ipsa et enim ut fuga. Similique qui dicta asperiores facilis corrupti officia. Qui praesentium ipsum.\n \rSunt dolores est voluptas voluptates eum magni alias qui. Eligendi et animi tenetur fugiat qui dolorem aut sed est. Dolor consequatur amet eaque aperiam.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 1,
    replyCount: 5,
    isLiked: 0,
    User: {
      id: 5,
      name: 'Tracy Towne',
      account: 'user5',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=37.8808195638617',
    },
    time: 'about 2 hours',
  },
  {
    id: 5,
    UserId: 6,
    description:
      'Aut sed quam perferendis repudiandae et tempore inventore explicabo ut.\nNihil dicta in ipsam.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 1,
    replyCount: 0,
    isLiked: 0,
    User: {
      id: 6,
      name: 'Ashley Ondricka',
      account: 'user6',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=26.314776042720133',
    },
    time: 'about 2 hours',
  },
  {
    id: 6,
    UserId: 7,
    description: 'et ut delectus',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 2,
    replyCount: 1,
    isLiked: 0,
    User: {
      id: 7,
      name: 'Priscilla Stehr',
      account: 'user7',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=33.233134434246146',
    },
    time: 'about 2 hours',
  },
  {
    id: 7,
    UserId: 2,
    description:
      'Incidunt beatae iste quaerat earum qui.\nSequi nemo reprehenderit quia voluptas eveniet ut maiores veritatis harum.\nDicta corrupti ut repellat quasi sit dolorem.\nProvident voluptatum libero recusandae sequi dolorem fuga.\nSed sed eos praesentium aspernatur eligendi.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 1,
    replyCount: 2,
    isLiked: 0,
    User: {
      id: 2,
      name: 'Lucia Raynor',
      account: 'user2',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=12.529173430492301',
    },
    time: 'about 2 hours',
  },
  {
    id: 8,
    UserId: 6,
    description: 'velit rem recusandae',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 2,
    replyCount: 1,
    isLiked: 0,
    User: {
      id: 6,
      name: 'Ashley Ondricka',
      account: 'user6',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=26.314776042720133',
    },
    time: 'about 2 hours',
  },
  {
    id: 9,
    UserId: 7,
    description: 'Iusto incidunt molestiae laborum sunt occaecati quis.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 2,
    replyCount: 0,
    isLiked: 0,
    User: {
      id: 7,
      name: 'Priscilla Stehr',
      account: 'user7',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=33.233134434246146',
    },
    time: 'about 2 hours',
  },
  {
    id: 10,
    UserId: 2,
    description: 'tenetur',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 1,
    replyCount: 1,
    isLiked: 0,
    User: {
      id: 2,
      name: 'Lucia Raynor',
      account: 'user2',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=12.529173430492301',
    },
    time: 'about 2 hours',
  },
  {
    id: 11,
    UserId: 3,
    description:
      'Recusandae esse voluptas excepturi reprehenderit voluptas officia voluptas sunt quia.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 0,
    replyCount: 1,
    isLiked: 0,
    User: {
      id: 3,
      name: 'Sharon Zboncak',
      account: 'user3',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=33.84501741456597',
    },
    time: 'about 2 hours',
  },
  {
    id: 12,
    UserId: 5,
    description: 'sit nihil ut',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 0,
    replyCount: 1,
    isLiked: 0,
    User: {
      id: 5,
      name: 'Tracy Towne',
      account: 'user5',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=37.8808195638617',
    },
    time: 'about 2 hours',
  },
  {
    id: 13,
    UserId: 7,
    description:
      'Ut consequatur dolorum reiciendis possimus odio sapiente iste perferendis nisi. Cum voluptate deleniti quisquam quis itaque id. Sit explicabo esse odio sed rem vel repellat minima. Mollitia harum id nihil porro vel quas facere fuga consectetur. Esse perspiciatis fugiat sapiente repellat doloremque.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 2,
    replyCount: 2,
    isLiked: 0,
    User: {
      id: 7,
      name: 'Priscilla Stehr',
      account: 'user7',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=33.233134434246146',
    },
    time: 'about 2 hours',
  },
  {
    id: 14,
    UserId: 1,
    description: 'Expedita rem laborum at impedit eum non alias dolorum.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 0,
    replyCount: 2,
    isLiked: 0,
    User: {
      id: 1,
      name: 'Robert Stroman',
      account: 'user1',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=19.49557651044964',
    },
    time: 'about 2 hours',
  },
  {
    id: 15,
    UserId: 4,
    description:
      'Laborum amet alias nisi non et. Laborum tenetur quas ea asperiores expedita quisquam fuga. Minima maiores enim excepturi deleniti autem et maiores molestiae.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 0,
    replyCount: 1,
    isLiked: 0,
    User: {
      id: 4,
      name: 'Claudia Heaney',
      account: 'user4',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=18.264206940918005',
    },
    time: 'about 2 hours',
  },
  {
    id: 16,
    UserId: 4,
    description: 'Maxime qui voluptatum quae.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 1,
    replyCount: 2,
    isLiked: 0,
    User: {
      id: 4,
      name: 'Claudia Heaney',
      account: 'user4',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=18.264206940918005',
    },
    time: 'about 2 hours',
  },
  {
    id: 17,
    UserId: 5,
    description:
      'Omnis itaque illo cupiditate.\nVitae amet earum molestiae odit voluptas nam nihil.\nQuia cupiditate earum ipsa.\nDolores nemo velit.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 2,
    replyCount: 0,
    isLiked: 0,
    User: {
      id: 5,
      name: 'Tracy Towne',
      account: 'user5',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=37.8808195638617',
    },
    time: 'about 2 hours',
  },
  {
    id: 18,
    UserId: 6,
    description: 'Atque ut natus esse.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 1,
    replyCount: 2,
    isLiked: 0,
    User: {
      id: 6,
      name: 'Ashley Ondricka',
      account: 'user6',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=26.314776042720133',
    },
    time: 'about 2 hours',
  },
  {
    id: 19,
    UserId: 1,
    description:
      'Velit omnis molestiae.\nEt voluptatem accusantium sint voluptatem.\nVoluptatum voluptas iste.\nSimilique occaecati enim doloremque veritatis nulla impedit et.\nSed ad aspernatur non.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 2,
    replyCount: 0,
    isLiked: 0,
    User: {
      id: 1,
      name: 'Robert Stroman',
      account: 'user1',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=19.49557651044964',
    },
    time: 'about 2 hours',
  },
  {
    id: 20,
    UserId: 8,
    description: 'Temporibus repudiandae alias a.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 0,
    replyCount: 0,
    isLiked: 0,
    User: {
      id: 8,
      name: 'Zachary Schneider',
      account: 'user8',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=12.96476705674201',
    },
    time: 'about 2 hours',
  },
  {
    id: 21,
    UserId: 5,
    description: 'reiciendis molestias animi',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 1,
    replyCount: 0,
    isLiked: 0,
    User: {
      id: 5,
      name: 'Tracy Towne',
      account: 'user5',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=37.8808195638617',
    },
    time: 'about 2 hours',
  },
  {
    id: 22,
    UserId: 1,
    description: 'laborum voluptas eos',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 0,
    replyCount: 1,
    isLiked: 0,
    User: {
      id: 1,
      name: 'Robert Stroman',
      account: 'user1',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=19.49557651044964',
    },
    time: 'about 2 hours',
  },
  {
    id: 23,
    UserId: 2,
    description:
      'Voluptatem consectetur optio. Explicabo dolores ipsum. Ea ut quae ab et. Fugit atque accusamus amet fuga. Dolor voluptas maxime.\n \rRerum doloremque voluptas quam neque rerum qui beatae commodi. Sit qui ab et aliquid. Delectus nihil iste consequatur. Sunt aut omnis at accusantium quia illo qui. Fugiat doloremque molestias perspiciatis.\n \rAut vero suscipit odit est corporis. Itaque deleniti quos fugiat et occaecati. Inventore unde et qui ea.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 2,
    replyCount: 2,
    isLiked: 0,
    User: {
      id: 2,
      name: 'Lucia Raynor',
      account: 'user2',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=12.529173430492301',
    },
    time: 'about 2 hours',
  },
  {
    id: 24,
    UserId: 3,
    description:
      'Reprehenderit exercitationem sint aperiam iure sed et non officiis.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 3,
    replyCount: 1,
    isLiked: 0,
    User: {
      id: 3,
      name: 'Sharon Zboncak',
      account: 'user3',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=33.84501741456597',
    },
    time: 'about 2 hours',
  },
  {
    id: 25,
    UserId: 6,
    description:
      'Cum vero repellat. Eos sed commodi facere. Sapiente repudiandae eligendi voluptate exercitationem iure.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 1,
    replyCount: 1,
    isLiked: 0,
    User: {
      id: 6,
      name: 'Ashley Ondricka',
      account: 'user6',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=26.314776042720133',
    },
    time: 'about 2 hours',
  },
  {
    id: 26,
    UserId: 1,
    description: 'est eius quae',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 0,
    replyCount: 0,
    isLiked: 0,
    User: {
      id: 1,
      name: 'Robert Stroman',
      account: 'user1',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=19.49557651044964',
    },
    time: 'about 2 hours',
  },
  {
    id: 27,
    UserId: 4,
    description:
      'Sapiente voluptate sint. Rerum distinctio officiis consequatur enim. Cupiditate distinctio at vel ad. Beatae esse temporibus voluptatem.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 1,
    replyCount: 0,
    isLiked: 0,
    User: {
      id: 4,
      name: 'Claudia Heaney',
      account: 'user4',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=18.264206940918005',
    },
    time: 'about 2 hours',
  },
  {
    id: 28,
    UserId: 6,
    description:
      'Assumenda perspiciatis nemo est enim. Commodi consequatur repudiandae eaque qui unde enim. Aut et dicta. Illo repellat voluptatem ipsam quis aut ipsa illo aut repellat. Deleniti ut molestiae optio et aut in dolores saepe fuga. Et voluptatem odio non ut vitae maxime laboriosam.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 1,
    replyCount: 0,
    isLiked: 0,
    User: {
      id: 6,
      name: 'Ashley Ondricka',
      account: 'user6',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=26.314776042720133',
    },
    time: 'about 2 hours',
  },
  {
    id: 29,
    UserId: 5,
    description: 'In et nisi ut quo.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 2,
    replyCount: 1,
    isLiked: 0,
    User: {
      id: 5,
      name: 'Tracy Towne',
      account: 'user5',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=37.8808195638617',
    },
    time: 'about 2 hours',
  },
  {
    id: 104,
    UserId: 3,
    description:
      'Aut perferendis aut quidem consequatur ad voluptatum vel qui. Rerum et voluptatem et ut tempore rerum nihil saepe. Quaerat placeat deserunt maxime. Voluptate dolores voluptas aut non beatae animi qui temporibus.\n \rEt quis quia amet perferendis enim. Nihil laudantium harum. Unde laboriosam quo. Minima officia numquam. Facilis recusandae et sunt quaerat mollitia est excepturi. Maxime odit est quia ducimus eius dolore distinctio quae suscipit.\n \rNihil illo dolorum quaerat unde reiciendis id rem. Magni explicabo ea at sit et et animi magnam. Provident eligendi iure doloremque.',
    createdAt: '2021-03-03T07:08:48.000Z',
    likeCount: 0,
    replyCount: 0,
    isLiked: 0,
    User: {
      id: 3,
      name: 'Sharon Zboncak',
      account: 'user3',
      avatar: 'https://loremflickr.com/320/240/dog/?lock=33.84501741456597',
    },
    time: 'about 2 hours',
  },
]
import { fromNowFilter } from './../utils/mixins'
export default {
  mixins: [fromNowFilter],
  name: 'PostTweet',
  props: {
    noActions: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tweets: [],
    }
  },
  created() {
    this.fetchTweets()
  },
  methods: {
    fetchTweets() {
      // TODO: 取得 API 請求後的資料
      this.tweets = dummyTweets.map((tweet) => {
        const {
          id,
          description,
          createdAt,
          likeCount,
          replyCount,
          User,
        } = tweet
        const { name, account, avatar } = User
        return {
          id,
          description,
          createdAt,
          likeCount,
          replyCount,
          name,
          account,
          avatar,
        }
      })
    },
  },
}
</script>

<style scoped>
.tweet-wrapper {
  width: auto;
  height: 136px;
}
.tweet-content {
  display: flex;
  margin-bottom: 10px;
  border-bottom: 1px solid #e6ecf0;
}
.tweet-user-photo {
  margin-top: 13px;
  margin-left: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.tweet {
  margin-top: 15px;
  margin-left: 10px;
}
.tweet-user {
  height: 22px;
}
.tweet-user-info {
  margin-left: 5px;
  color: #657786;
}
.tweet-description {
  margin-top: 6px;
  margin-bottom: 37px;
}
button {
  margin-left: auto;
  border: none;
  background: none;
}
</style>
