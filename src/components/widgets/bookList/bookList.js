export default {
    //模板id,与.vue文件和文件夹同名
    id: 'bookList',
    //模板分类
    classify: '榜单',
    //模板名字
    name: '榜单',
    //模板和表单数据
    useForm: true,
    props: {
        //书籍列表
        bookList: [{
            //封面
            cover: require('../../../assets/bookList/default_cover.jpeg'),
            //书名
            name: '书籍名称',
            //作者
            author: '这是作者',
            //简介
            des: '这是简介'
        }],
        //列数
        col: 1,
        //个数
        count: 1,
        //外边距
        margin: 20,
        //行距
        rowSpacing: 20,
        //列距
        colSpacing: 20,
        //选项
        select: [{
            id: 'channel',
            name: '频道',
            des: '请输入您想显示的频道号',
            val: ''
        }, {
            id: 'user',
            name: '偏好',
            des: '请输入您想输入的偏好key',
            val: ''
        }, {
            id: 'bookId',
            name: '书籍id',
            des: '请输入书籍id，并且以逗号（英文半角","）隔开',
            val: ''
        }],
        selected: 'channel'
    }
}