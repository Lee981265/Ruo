/**
 * Ruo 主题配置文件
 * 联系作者：Blog: https://lee.js.org      QQ: 2037343920
 */

export default {
  /**
   * =========================================================
   *                      站点功能【必需】
   * =========================================================
   */

  /**
   * 站点标题
   */
  title: '若尘',
  subtitle: 'coding with love',

  /**
   * Github Issues 配置【文章、说说、书单、友链】
   */
  username: 'chanshiyucx', // github 用户名
  repository: 'blog', // 文章仓库地址
  // token 从中间任意位置拆开成两部分，避免 github 代码检测失效
  token: ['0ad1a0539c5b96fd18fa', 'aaafba9c7d1362a5746c'],

  /**
   * Gitalk 配置【评论功能】，详细文档参见：https://github.com/gitalk/gitalk
   */
  gitalk: {
    display: true, // 是否显示评论
    clientID: '057dc90573215123a895',
    clientSecret: 'c67c283c8f875cb7c7a20fe6fadc364c5eec0de7',
    repo: 'comment', // 评论仓库地址
    owner: 'Lee981265',
    admin: ['Lee981265'],
    distractionFreeMode: false // 是否开始无干扰模式【背景遮罩】
  },

  /**
   * leancloud 配置 【文章浏览次数】
   */
  leancloud: {
    appId: 'LjOwR4ELEqbauKvtQbwq5TUw-MdYXbMMI',
    appKey: 'BOSFJ49ohbGctgn4zvJE9VN6'
  },

  /**
   * =========================================================
   *                        页面设置
   * =========================================================
   */

  /**
   * 归档页面
   */
  archiveOpts: {
    display: true, // 是否显示该页面
    enableComment: false, // 是否开启评论功能
    qoute: '華枝春滿 天心月圓' // 页面顶部一言
  },

  /**
   * 分类页面【与 Github Issues 的 Milestone 对应】
   */
  categoryOpts: {
    display: true,
    enableComment: false,
    qoute: '桜華月想 暮色蒼然'
  },

  /**
   * 标签配置
   */
  tagOpts: {
    display: true,
    enableComment: false,
    qoute: '灯笼流丽，百鬼夜行'
  },

  /**
   * 灵感页面
   */
  inspirationOpts: {
    display: true,
    enableComment: true,
    qoute: '詠奏妖華，明鏡止水'
  },

  /**
   * 书单页面
   */
  bookOpts: {
    display: true,
    enableComment: true,
    qoute: '追想風景 彼岸帰航'
  },

  /**
   * 友链页面
   */
  friendOpts: {
    display: true,
    enableComment: true,
    qoute: '青青子衿，悠悠我心'
  },

  /**
   * 关于页面
   */
  aboutOpts: {
    display: true,
    enableComment: true,
    qoute: '蝉鸣如雨，花宵道中',
    avatar: require('./assets/images/avatar.png'),
    graduated: 'University of Electronic Science and Technology of China (UESTC)',
    college: 'Communication&Information Engineering',
    // 联系方式，可自由添加
    contact: [
      {
        icon: require('./assets/images/email.png'),
        link: 'http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=tNnR9Nfc1drH3N3NwZrX29k'
      },
      {
        icon: require('./assets/images/github.png'),
        link: 'https://github.com/chanshiyucx'
      },
      {
        icon: require('./assets/images/zhihu.png'),
        link: 'https://www.zhihu.com/people/ichanshiyu/activities'
      },
      {
        icon: require('./assets/images/music.png'),
        link: 'https://music.163.com/#/user/home?id=103060582'
      }
    ]
  },

  /**
   * =========================================================
   *                         主题自定义
   * =========================================================
   */

  /**
   * 赛钱箱
   */
  qrcode: [
    {
      name: '支付宝',
      img: require('./assets/images/zfb.png')
    },
    {
      name: '微信',
      img: require('./assets/images/wx.png')
    }
  ],

  /**
   * 加载动画
   */
  loadingImg: require('./assets/images/loading.gif'),

  /**
   * 文章默认图
   */
  defaultCover: require('./assets/images/defaultCover.jpg'),

  /**
   * 音乐播放器,
   */
  APlayer: [
    {
      name: 'うたかたの风と蝉时雨',
      artist: 'Little Planet',
      url: 'https://files.catbox.moe/wo7zjt.mp3',
      cover: require('./assets/images/cover1.jpg')
    },
    {
      name: '春の凑に',
      artist: 'TUMENECO',
      url: 'https://files.catbox.moe/ducy49.mp3',
      cover: require('./assets/images/cover2.jpg')
    },
    {
      name: '夏阳炎',
      artist: '天威梦方',
      url: 'https://files.catbox.moe/7migen.mp3',
      cover: require('./assets/images/cover3.jpg')
    },
    {
      name: '秋风のとおり道',
      artist: '风神华伝',
      url: 'https://files.catbox.moe/b58fq6.mp3',
      cover: require('./assets/images/cover4.jpg')
    },
    {
      name: '冬のわすれもの',
      artist: 'ハルノカゼ',
      url: 'https://files.catbox.moe/vwnawp.mp3',
      cover: require('./assets/images/cover5.jpg')
    }
  ],

  /**
   * 主题配色，目前主要用于文章、说说、关于等卡片配色，以后可能会有其他用途
   * 推荐一个好看的取色站，日本の伝統色：http://nipponcolors.com/
   */
  themeColors: [
    '#B28FCE', // 薄
    '#86C166', // 苗
    '#F596AA', // 桃
    '#F19483', // 曙
    '#F9BF45', // 玉子
    '#FAD689', // 浅黄
    '#E79460', // 洗柿
    '#2EA9DF', // 露草
    '#FB966E', // 洗朱
    '#BC9F77', // 白茶
    '#867835', // 黄海松茶
    '#B9887D' // 水がき
  ]
}