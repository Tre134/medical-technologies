import {Fancybox} from "@fancyapps/ui";


export default function initFancybox() {
    Fancybox.bind("[data-fancybox]", {
        type: "inline",
        dragToClose: false,
        touch: false,
    });
}
