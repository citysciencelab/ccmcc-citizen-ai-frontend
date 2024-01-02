<template>
  <q-page-sticky v-if="true" position="top-right" :offset="[20, 20]">
    <TextPopup v-model="showCredits" class="textpopup">
      <p>
        Part of “city climate meets creative coding”<br/>
        <a href="https://www.creativecoding.city/citizen-ai" target="_blank">creativecoding.city/citizen-ai</a>
      </p>
      <h3>Concept</h3>
      <p>
        Birk Schmithüsen <a target="_blank" href="https://birkschmithuesen.com/">birkschmithuesen.com</a><br/>
        Mikala Hyldig Dal <a target="_blank" href="https://cargocollective.com/mikala-hyldig-dal">cargocollective.com/mikala-hyldig-dal</a><br/>
        Nina Maria Stemberger | ArtesMobiles <a target="_blank" href="https://artesmobiles.art/">artesmobiles.art</a>
      </p>
      <h3>System Dynamics</h3>
      <p>
        Rico Herzog
      </p>
      <h3>Climate Scientist</h3>
      <p>
        Gaby Langendijk
      </p>
      <h3>Code</h3>
      <p>
        Jakob Wierzba <a href="https://cyfta.com/" target="_blank">cyfta.com</a>
      </p>
    </TextPopup>
    <TextPopup v-model="showContact">
      <p>
        This web site does not collect any personal data.<br/>
        Your IP in the server logs will be anonymized.
      </p>
      <p>
        Responsible for contents / “Impressum”:<br/>
        <a href="https://www.birkschmithuesen.com/_imprint" target="_blank">Contact Birk Schmithüsen</a>
      </p>
      <p>
        API:<br/>
        <a href="https://modelserver.cut.hcu-hamburg.de/" target="_blank">Contact for Urban Model Server</a>
      </p>
    </TextPopup>
    <q-btn round icon="menu" color="white" text-color="black">
      <q-menu :offset="[0, 20]" :dark="false" auto-close>
        <q-list style="min-width: 10em">
          <q-item
            clickable
            @click="showCredits = true"
            >
            <q-item-section>
              Credits
            </q-item-section>
          </q-item>
          <q-item
            clickable
            tag="a"
            target="_blank"
            href="https://www.creativecoding.city/citizen-ai"
            >
            <q-item-section>
              Project info
            </q-item-section>
            <!--
            <q-item-section avatar>
              <q-icon name="launch" />
            </q-item-section>
            -->
          </q-item>
          <q-item
            clickable
            @click="showContact = true"
            >
            <q-item-section>
              Contact + Privacy
            </q-item-section>
            <!--
            <q-item-section avatar>
              <q-icon name="launch" />
            </q-item-section>
            -->
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </q-page-sticky>
</template>

<script>

import TextPopup from './TextPopup.vue'

export default {
  components: { TextPopup },
  data: function () {
    return {
      showCredits: false,
      showContact: false
    }
  }
}

</script>

<style lang="stylus">

.textpopup
  color black
  h3
    font-size 100%
    font-weight bold
    margin 0.5em 0 0 0
    line-height normal
  p
    margin 0.25em 0
  a:link
  a:visited
  a:active
  a:hover
    color inherit

</style>
