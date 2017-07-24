<template>
    <div>
      <view-header></view-header>
      <aside>
        <mu-list>
          <mu-list-item title="Inbox">
            <mu-icon slot="left" value="inbox"/>
          </mu-list-item>
          <mu-list-item title="Starred">
            <mu-icon slot="left" value="grade"/>
          </mu-list-item>
          <mu-list-item title="Sent mail">
            <mu-icon slot="left" value="send"/>
          </mu-list-item>
          <mu-list-item title="Drafts">
            <mu-icon slot="left" value="drafts"/>
          </mu-list-item>
        </mu-list>
        <mu-divider />
        <mu-list>
          <mu-list-item title="All mail">
            <mu-icon slot="right" value="info"/>
          </mu-list-item>
          <mu-list-item title="Trash">
            <mu-icon slot="right" value="info"/>
          </mu-list-item>
          <mu-list-item title="Spam">
            <mu-icon slot="right" value="info"/>
          </mu-list-item>
          <mu-list-item title="Follow up">
            <mu-icon slot="right" value="info"/>
          </mu-list-item>
        </mu-list>
      </aside>
      <section>
        123123123
        this is template body
      </section>

    </div>
</template>
<style>

</style>
<script>

  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    }
  }
</script>
