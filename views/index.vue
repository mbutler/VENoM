<template lang="html">
    <div>
        <h1>{{title}}</h1>
        <p>Welcome to the {{title}} demo.</p>
        <input v-model="message" placeholder="edit me">        
        <p><message :message="message">{{ message }}</message></p>        
        <p>From the database:</p>
        <ol>
            <li v-for="quote in quotes">
            {{ quote.quote }}
            </li>
        </ol>

        <form action="/quotes" method="POST">
            <input type="text" placeholder="name" name="name">
            <input type="text" placeholder="quote" name="quote">
            <button type="submit">Submit</button>
        </form>

    </div>
</template>

<script>
export default {
    data: function() {
        return {
        }
    }
}
</script>

<style lang="css">
</style>