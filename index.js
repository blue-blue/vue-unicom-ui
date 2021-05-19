import UnicomInputText from "./package/unicom-input-text/index.vue";
import UnicomInputNumber from "./package/unicom-input-number/index.vue";
import UnicomInputFile from "./package/unicom-input-file/index.vue";
import UnicomSelect from "./package/unicom-select/index.vue";
import UnicomPages from "./package/unicom-pages/index.vue";
import UnicomRadio from "./package/unicom-radio/index.vue";
import UnicomCheckboxGroup from "./package/unicom-checkbox/checkbox-group.vue";
import UnicomCheckbox from "./package/unicom-checkbox/index.vue";
import UnicomCarousel from "./package/unicom-carousel/index.vue";
import UnicomCarouselItem from "./package/unicom-carousel/item.vue";
import UnicomMarquee from "./package/unicom-marquee/index.vue";
import UnicomButton from "./package/unicom-button/index.vue";
import UnicomSwitch from "./package/unicom-switch/index.vue";
import UnicomTree from "./package/unicom-tree/index.vue";
import UnicomProgress from "./package/unicom-progress/index.vue";
import UnicomDropdown from "./package/unicom-dropdown/index.vue";
import UnicomCollapse from "./package/unicom-collapse/index.vue";
import UnicomTransfer from "./package/unicom-transfer/index.vue";
import UnicomTimeline from "./package/unicom-timeline/index.vue";
import UnicomSelectLinkage from "./package/unicom-select-linkage/index.vue";
import UnicomTabs from "./package/unicom-tabs/index.vue";
import UnicomCalendar from "./package/unicom-calendar/index.vue";
import UnicomWarningAlert from "./package/unicom-warning-alert/index.vue";
import UnicomConfirmAlert from "./package/unicom-confirm-alert/index.vue";
import UnicomInputAlert from "./package/unicom-input-alert/index.vue";
import UnicomMessageAlert from "./package/unicom-message-alert/index.vue";
import UnicomInfoAlert from "./package/unicom-info-alert/index.vue";
import UnicomLoadingAlert from "./package/unicom-loading-alert/index.vue";
import unicomContent from "./package/unicom-content/index.vue";

const UnicomUI = {
  install:function(Vue){
      Vue.component('UnicomInputText', UnicomInputText);
      Vue.component('UnicomInputNumber', UnicomInputNumber);
      Vue.component('UnicomInputFile', UnicomInputFile);
      Vue.component('UnicomSelect', UnicomSelect);
      Vue.component('UnicomPages', UnicomPages);
      Vue.component('UnicomRadio', UnicomRadio);
      Vue.component('UnicomCheckboxGroup', UnicomCheckboxGroup);
      Vue.component('UnicomCheckbox', UnicomCheckbox);
      Vue.component('UnicomCarousel', UnicomCarousel); 
      Vue.component('UnicomCarouselItem', UnicomCarouselItem); 
      Vue.component('UnicomMarquee', UnicomMarquee); 
      Vue.component('UnicomButton', UnicomButton);
      Vue.component('UnicomSwitch', UnicomSwitch);
      Vue.component('UnicomTree', UnicomTree);
      Vue.component('UnicomProgress', UnicomProgress);
      Vue.component('UnicomDropdown', UnicomDropdown);
      Vue.component('UnicomCollapse', UnicomCollapse);
      Vue.component('UnicomTransfer', UnicomTransfer);
      Vue.component('UnicomTimeline', UnicomTimeline);
      Vue.component('UnicomSelectLinkage', UnicomSelectLinkage);
      Vue.component('UnicomTabs', UnicomTabs);
      Vue.component('UnicomCalendar', UnicomCalendar);
      Vue.component('UnicomWarningAlert', UnicomWarningAlert);
      Vue.component('UnicomConfirmAlert', UnicomConfirmAlert);
      Vue.component('UnicomInputAlert', UnicomInputAlert);
      Vue.component('UnicomMessageAlert', UnicomMessageAlert);
      Vue.component('UnicomInfoAlert', UnicomInfoAlert);
      Vue.component('UnicomLoadingAlert', UnicomLoadingAlert);
      Vue.component('unicomContent', unicomContent);
  }
}

import "./icon/iconfont.css";

export default UnicomUI
