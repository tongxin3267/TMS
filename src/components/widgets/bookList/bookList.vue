<template>
    <div class="book_list" :style="{padding: data.margin + 'px'}">
        <div class="list" :style="{marginRight: -data.colSpacing + 'px', marginTop: -data.rowSpacing + 'px'}">
            <div class="book_item" v-for="item in data.bookList" :style="{width: (Math.floor(100 / data.col * 100)) / 100 + '%'}">
                <div class="item" :style="{marginRight: data.colSpacing + 'px', marginTop: data.rowSpacing + 'px'}">
                    <div class="book_cover">
                        <img :src="item.cover">
                    </div>
                    <div class="book_name">{{item.name}}</div>
                    <div class="book_author">{{item.author}}</div>
                    <div class="book_desc">{{item.des}}</div>
                </div>
            </div>     
        </div>   
    </div>
</template>
<script>
    export default{
        props: ['data']
    }
</script>
<style lang="scss" scoped>
    .book_list{
        overflow: hidden;
        .list{
            overflow: hidden;
        }
        .book_item{
            float: left;
            .item{
                .book_cover img{
                    width: 100%;
                    display: block;
                }
                .book_name{
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    font-size: .7rem;
                    line-height: .8rem;
                    text-align: center;
                    padding: .6rem 0;
                }
                .book_author{
                    font-size: .7rem;
                    line-height: .8rem;
                    text-align: center;
                    padding: .6rem 0;
                    color: #ffa000;
                }   
                .book_desc{
                    font-size: .6rem;
                    line-height: 1.5;
                    height: 1.8rem;
                    text-align: center;
                    padding: .6rem 0;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }                             
            }
        }
    }
</style>