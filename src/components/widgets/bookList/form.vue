<template>
<div>
    <div class="input_item">
        <div class="option">行数</div>
        <div class="val">
            <input type="text" v-model="d.col" @input="testVal">
        </div>
    </div>
    <div class="input_item">
        <div class="option">书籍个数</div>
        <div class="val">
            <input type="text" v-model="d.count" @input="testVal">
        </div>
    </div> 
    <div class="input_item">
        <div class="option">外边距</div>
        <div class="val">
            <input type="text" v-model="d.margin" @input="testVal">
        </div>
    </div> 
    <div class="input_item">
        <div class="option">行距</div>
        <div class="val">
            <input type="text" v-model="d.rowSpacing" @input="testVal">
        </div>
    </div> 
    <div class="input_item">
        <div class="option">列距</div>
        <div class="val">
            <input type="text" v-model="d.colSpacing" @input="testVal">
        </div>
    </div>
    <div class="select_wrap">
        <div class="input_item">
            <div class="option">书籍来源</div>
            <div class="val">
                <select v-model="selected" @change="changeSelected">
                    <option v-for="item in d.select" :value="item.id">{{item.name}}</option>
                </select>
            </div>
        </div>
        <div class="confirm_item" v-for="item, index in d.select" v-show="selected == item.id">
            <div class="title">{{item.des}}</div>
            <div class="confirm">
                <textarea v-model="item.val"></textarea>
                <div class="btn">
                    <a href="javascript:;" @click="clear(index, $event.target)">清空</a>
                    <a href="javascript:;" @click="getInfo">确定</a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    export default{
        props: ['data'],
        data() {
            return {
                // d: this.data,
                selected: this.data.selected
            }
        },
        computed: {
            d() {
                return JSON.parse(JSON.stringify(this.data));
            }
        },
        watch: {
            d: {
                handler: function(a,b) {
                    var str = JSON.stringify(a),
                        newData = JSON.parse(str),
                        count = a.count,
                        l = a.bookList.length;
                    if (l < count) {
                        for (let i = 0; i < count - l; i++) {
                            newData.bookList.push({
                                cover: require('../../../assets/bookList/default_cover.jpeg'),
                                name: '书籍名称',
                                author: '这是作者',
                                des: '这是简介'
                            });
                        }
                    } else if (l > count) {
                        newData.bookList.splice(0, count);
                    }
                    // this.$store.commit('updateData', newData);
                },
                deep: true
            }
        },
        methods: {
            testVal() {
                var testArr = ['col', 'count', 'margin', 'rowSpacing', 'colSpacing'];
                testArr.map((item, index) => {
                    if (!this.d[item] || isNaN(this.d[item])) {
                        this.d[item] = 1;
                    }
                });
                this.bookCount();
                this.$store.commit('updateData', this.d);
            },
            bookCount() {
                var count = this.d.count,
                    l = this.d.bookList.length;
                if (l < count) {
                    for (let i = 0; i < count - l; i++) {
                        this.d.bookList.push({
                            cover: require('../../../assets/bookList/default_cover.jpeg'),
                            name: '书籍名称',
                            author: '这是作者',
                            des: '这是简介'
                        });
                    }
                } else if (l > count) {
                    this.d.bookList.splice(0, count);
                }
            },
            changeSelected() {
                this.d.select.map((one, i) => {
                    if (one.id != this.selected) {
                        one.val = '';
                    }
                });
            },
            clear(index, tr) {
                let ta = this.$el.getElementsByTagName('textarea');
                ta[index].value = '';
                this.d.select[index].val = '';
            },
            getInfo() {
                var _this = this;
                this.$http.get('http://localhost:3000/getBookInfo', {
                    params: {
                        ca: 'Book.GetBookInfo',
                        ids: '10918209,10085124'
                    }
                }).then((res) => {
                    console.log(res)
                    let list = res.data.body.data,
                        arr = [];
                    list.map((one, index) => {
                        var obj = {};
                        obj.cover = one.bookPicUrl;
                        obj.name = one.bookName;
                        obj.author = one.bookAuthor;
                        obj.des = one.bookDesc;
                        arr.push(obj);
                    });
                    this.d.bookList = arr.splice(0, this.d.count);
                    this.$store.commit('updateData', this.d);
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .input_item{
        overflow: hidden;
        margin-bottom: 20px;
        .option{
            float: left;
            font-size: 14px;
            line-height: 40px;
            width: 30%;
        }
        .val{
            overflow: hidden;
            input, select{
                border: 1px solid #e4e4e4;
                font-size: 14px;
                padding: 12px 10px;
                line-height: 16px;
                box-sizing: border-box;
                display: block;
                width: 100%;
            }
            input:hover, select:hover{
                border: 1px solid #999;
            }
            input:focus{
                border: 1px solid #999;
            }            
        }        
    }
    .confirm_item{
        margin-bottom: 20px;
        .title{
            text-align: center;
            padding: 10px 0;
            color: #e8554d;
        }
        .confirm{
            overflow: hidden;
            background-color: #fff;
            border: 1px solid #e4e4e4;
            border-radius: 4px;
            textarea{
                float: left;
                resize: none;
                width: 150px;
                height: 100px;
                box-sizing: border-box;
                padding: 10px;
            }
            .btn{
                overflow: hidden;
                text-align: center;
                margin-top: 13px;
                a{
                    display: inline-block;
                    width: 100px;
                    font-size: 12px;
                    line-height: 30px;
                    text-align: center;
                    border: 1px solid #e4e4e4;
                    border-radius: 4px;
                }
                a:nth-child(1) {
                    margin-bottom: 10px;
                }
                a:hover{
                    border: 1px solid #999;
                }
                a:active{
                    border: 1px solid #999;
                    background-color: #ddd;
                }                
            }
        }
    }
</style>