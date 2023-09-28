const selectedAPIItemsMock = 
    {
        "https://api.reverb.com/api/listings/?page=2": [
            [
                "data",
                "listings",
                "1",
                "finish"
            ],
            [
                "data",
                "listings",
                "1",
                "title"
            ],
            [
                "data",
                "listings",
                "1",
                "condition"
            ],
            [
                "data",
                "listings",
                "1",
                "has_inventory"
            ],
            [
                "data",
                "humanized_params"
            ],
            [
                "data",
                "_links",
                "prev",
                "href"
            ],
            [
                "data",
                "listings",
                "15",
                "category_uuids",
                "1"
            ],
            [
                "data",
                "listings",
                "15",
                "listing_currency"
            ]
        ]
    }

const mogrtSourcesMock = {
    "Weather": [
      "Head",
      "Date",
      "Region",
      "City",
      "City name",
      "Temperature - day",
      "Temperature - night",
      "Conditions",
      "City",
      "City name",
      "Temperature - day",
      "Temperature - night",
      "Slider Control",
      "City",
      "City name",
      "Temperature - day",
      "Temperature - night",
      "Conditions",
      "City",
      "City name",
      "Temperature - day",
      "Temperature - night",
      "Conditions",
      "City",
      "City name",
      "Temperature - day",
      "Temperature - night",
      "Conditions",
      "Placeholder"
    ]
  }

const selectedMogrtItemsMock = {
    "Weather": [
        {
            "title": "Head",
            "index": 0
        },
        {
            "title": "City",
            "index": 3
        },
        {
            "title": "Region",
            "index": 2
        },
        {
            "title": "City name",
            "index": 14
        },
        {
            "title": "City",
            "index": 23
        },
        {
            "title": "Temperature - day",
            "index": 20
        },
        {
            "title": "Temperature - night",
            "index": 16
        },
        {
            "title": "City name",
            "index": 24
        },
        {
            "title": "Temperature - day",
            "index": 25
        },
        {
            "title": "City",
            "index": 18
        },
        {
            "title": "City",
            "index": 13
        },
        {
            "title": "Temperature - night",
            "index": 11
        },
        {
            "title": "Temperature - day",
            "index": 10
        }
    ]
}

const matchedPathMock = {
    "Weather": {
        "https://api.reverb.com/api/listings/?page=2": {
            "mogrtPaths": [
                0,
                14,
                16
            ],
            "JSONPaths": [
                [
                    "listings",
                    "1",
                    "finish"
                ],
                [
                    "listings",
                    "1",
                    "has_inventory"
                ],
                [
                    "listings",
                    "15",
                    "category_uuids",
                    "1"
                ]
            ]
        },
        "local": {
            "mogrtPaths": [
                0,
                14,
                16
            ],
            "values": ["Кашира", "Ступино", "Москва"]
        }
    }
}

const matchedValuesMock = {
    "Weather": {
            "mogrtPaths": [
                0,
                14,
                16
            ],
            "values": [
               'val1', 'val2', 'val3'
            ]
    }
}


export {selectedAPIItemsMock, mogrtSourcesMock, selectedMogrtItemsMock, matchedPathMock}