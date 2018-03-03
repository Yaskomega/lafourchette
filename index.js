//var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs  = require('fs');
//var app = express();
var port = 8000;

//var url = 'https://www.lafourchette.com/restaurant/matsuri-marbeuf/14234';
//getOffers(url);

function getOffers(url){
    return new Promise(function(resolve, reject) {
        request(url, function (error, response, html) {
            if(error){
                console.log(error);
            } else if ( response.statusCode != 200) {
                console.log(response.statusCode);
            } else {
                var $ = cheerio.load(html);
                var offers = [];

                $('.saleType').each(function(index, element) {
                    var title = $(this).find('.saleType-title');
                    var description = $(this).find('p');
                    var offer = {
                        title : title.text(),
                        description : description.text()
                    }
                    offers.push(offer);
                });

                //console.log(offers);
            }
            resolve(offers);
        })
    });
}



//searchRestaurant('Le Chiberta');

function searchRestaurant(restaurantName) {
    return new Promise(function(resolve, reject) {
        var url_search = 'https://www.lafourchette.com/search-refine/' + restaurantName;
        request(url_search, function (error, response, html) {
            if(error){
                console.log(error);
            } else if ( response.statusCode != 200) {
                console.log(response.statusCode);
            } else {
                var $ = cheerio.load(html);

                var resultItem = $('.resultItem-name');
                resultItem = resultItem.first();
                //console.log(resultItem.text());

                var url = resultItem.children().first();
                url = url.attr('href');
                //console.log(url.attr('href'));
            }
            resolve(url);
        })
    });

}

async function getDeals(restaurantName) {
    var url = await searchRestaurant(restaurantName);
    console.log(url);
    var host = "https://www.lafourchette.com";
    url = host + url;
    return await getOffers(url);
}

//var deals = getDeals('Le Chiberta');
//console.log(deals);

//test();

