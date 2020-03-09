<template>
    <div class="comments-container">
        <div class="box" v-for="item in comments" :key="item.id">
            <div class="top">
            <div class="img">
                <van-icon name="friends-o" size="20px" color="#666"/>
            </div>
            <span>{{item.user}}</span>
            </div>
            <div class="van-multi-ellipsis--l3 comments">{{item.comments}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["comments"]
    }
</script>

<style lang="scss" scoped>
.comments-container {
    padding: 0 16px;
    .box {
        margin-bottom: 20px;
        width: 100%;
        background-color: #f2f2f2;
        border-radius: 10px;
        padding: 16px;
        .top {
            display: flex;
            align-items: center;
            color: rgba(0,0,0,.87);
            .img {
                width: 33px;
                height: 33px;
                margin-right: 10px;
                border-radius: 50%;
                background-color: #ccc;
                line-height: 33px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        .comments {
            font-size: 12.5px;
            line-height: 16px;
            color: rgba(0,0,0,.87);
            padding-top: 5px;
        }
    }
}
</style>