/**
 * Created by rignonnoel on 16-11-19.
 */

function scrollToAnchor(aid){
    var aTag = $("#"+aid);
    $('html,body').animate({scrollTop: aTag.offset().top-50},'slow');
}