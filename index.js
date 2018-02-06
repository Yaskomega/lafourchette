var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs  = require('fs');
var app = express();
var port = 8000;

var url = 'https://www.lafourchette.com/restaurant/matsuri-marbeuf/14234';

getOffers(url);

function getOffers(url){
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

            console.log(offers);

        }

    })
}

/*
searchRestaurant('Le Chiberta');

function searchRestaurant(restaurantName) {
    url = 'https://www.lafourchette.com/search-refine/' + restaurantName;
    request(url, function (error, response, html) {
        if(error){
            console.log(error);
        } else if ( response.statusCode != 200) {
            console.log(response.statusCode);
        } else {
            var $ = cheerio.load(html);

            var resultItem = $('.resultItem-name');
            resultItem = resultItem.first();
            console.log(resultItem.text());

            var url = resultItem.children().first();
            console.log(url.attr('href'));
        }

    })
}
*/