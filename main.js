{
    "type": "APL",
    "version": "1.0",
    "theme": "dark",
    "import": [
        {
            "name": "alexa-layouts",
            "version": "1.0.0"
        }
    ],
    "resources": [
        {
            "description": "Stock color for the light theme",
            "colors": {
                "colorTextPrimary": "#151920"
            }
        },
        {
            "description": "Stock color for the dark theme",
            "when": "${viewport.theme == 'dark'}",
            "colors": {
                "colorTextPrimary": "#f0f1ef"
            }
        },
        {
            "description": "Standard font sizes",
            "dimensions": {
                "textSizeBody": 48,
                "textSizePrimary": 27,
                "textSizeSecondary": 23,
                "textSizeSecondaryHint": 25
            }
        },
        {
            "description": "Common spacing values",
            "dimensions": {
                "spacingThin": 6,
                "spacingSmall": 12,
                "spacingMedium": 24,
                "spacingLarge": 48,
                "spacingExtraLarge": 72
            }
        },
        {
            "description": "Common margins and padding",
            "dimensions": {
                "marginTop": 40,
                "marginLeft": 60,
                "marginRight": 60,
                "marginBottom": 40
            }
        }
    ],
    "styles": {
        "textStyleBase": {
            "description": "Base font description; set color",
            "values": [
                {
                    "color": "@colorTextPrimary"
                }
            ]
        },
        "textStyleBase0": {
            "description": "Thin version of basic font",
            "extend": "textStyleBase",
            "values": {
                "fontWeight": "100"
            }
        },
        "textStyleBase1": {
            "description": "Light version of basic font",
            "extend": "textStyleBase",
            "values": {
                "fontWeight": "300"
            }
        },
        "mixinBody": {
            "values": {
                "fontSize": "@textSizeBody"
            }
        },
        "mixinPrimary": {
            "values": {
                "fontSize": "@textSizePrimary"
            }
        },
        "mixinSecondary": {
            "values": {
                "fontSize": "@textSizeSecondary"
            }
        },
        "textStylePrimary": {
            "extend": [
                "textStyleBase1",
                "mixinPrimary"
            ]
        },
        "textStyleSecondary": {
            "extend": [
                "textStyleBase0",
                "mixinSecondary"
            ]
        },
        "textStyleBody": {
            "extend": [
                "textStyleBase1",
                "mixinBody"
            ]
        },
        "textStyleSecondaryHint": {
            "values": {
                "fontFamily": "Bookerly",
                "fontStyle": "italic",
                "fontSize": "@textSizeSecondaryHint",
                "color": "@colorTextPrimary"
            }
        }
    },
    "layouts": {},
    "mainTemplate": {
        "parameters": [
            "payload"
        ],
        "items": [
            {
                "when": "${viewport.shape == 'round'}",
                "type": "Container",
                "direction": "column",
                "width": "100vw",
                "height": "100vh",
                "items": [
                    {
                        "type": "Image",
                        "source": "${payload.bodyTemplate2Data.image.sources[0].url}",
                        "scale": "best-fill",
                        "width": "100vw",
                        "height": "100vh",
                        "position": "absolute",
                        "overlayColor": "rgba(0, 0, 0, 0.6)"
                    },
                    {
                        "type": "ScrollView",
                        "width": "100vw",
                        "height": "100vh",
                        "item": [
                            {
                                "type": "Container",
                                "direction": "column",
                                "alignItems": "center",
                                "paddingLeft": "70dp",
                                "paddingRight": "70dp",
                                "items": [
                                    {
                                        "type": "Container",
                                        "height": "21vh",
                                        "paddingTop": "2vh",
                                        "items": [
                                            {
                                                "type": "Image",
                                                "width": "90px",
                                                "height": "90px",
                                                "source": "https://i.imgur.com/KLvM3rR.png"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Text",
                                        "style": "textStyleBody",
                                        "width": "70vw",
                                        "paddingTop": "10",
                                        "paddingBottom": "10",
                                        "textAlign": "center",
                                        "color": "#00bfff",
                                        "fontSize": "30",
                                        "text": "<b>${payload.bodyTemplate2Data.textContent.title.text}</b>"
                                    },
                                    {
                                        "type": "Text",
                                        "style": "textStylePrimary",
                                        "width": "70vw",
                                        "textAlign": "center",
                                        "fontSize": "${payload.bodyTemplate2Data.textContent.primaryText.size}",
                                        "text": "${payload.bodyTemplate2Data.textContent.primaryText.text}"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "type": "Container",
                "width": "100vw",
                "height": "100vh",
                "items": [
                    {
                        "type": "Image",
                        "source": "${payload.bodyTemplate2Data.backgroundImage.sources[0].url}",
                        "scale": "best-fill",
                        "width": "100vw",
                        "height": "100vh",
                        "position": "absolute",
                        "overlayColor": "rgba(0, 0, 0, 0.6)"
                    },
                    {
                        "type": "AlexaHeader",
                        "headerTitle": "${payload.bodyTemplate2Data.title}",
                        "headerAttributionImage": "${payload.bodyTemplate2Data.logoUrl}"
                    },
                    {
                        "type": "Container",
                        "direction": "row",
                        "paddingLeft": "60dp",
                        "paddingRight": "72dp",
                        "grow": 1,
                        "shrink": 1,
                        "height": "100vh",
                        "items": [
                            {
                                "type": "ScrollView",
                                "height": "100%",
                                "grow": 1,
                                "shrink": 1,
                                "item": [
                                    {
                                        "type": "Container",
                                        "items": [
                                            {
                                                "type": "Text",
                                                "style": "textStylePrimary",
                                                "color": "#4dd2ff",
                                                "text": "<b>${payload.bodyTemplate2Data.textContent.primaryText.title}</b>"
                                            },
                                            {
                                                "type": "Text",
                                                "text": "${payload.bodyTemplate2Data.textContent.primaryText.text}",
                                                "spacing": "@spacingSmall",
                                                "paddingTop": "40dp",
                                                "paddingRight": "70dp",
                                                "style": "textStylePrimary"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "Image",
                                "source": "${payload.bodyTemplate2Data.image.sources[0].url}",
                                "width": 340,
                                "height": 384,
                                "scale": "best-fit",
                                "align": "center"
                            }
                        ]
                    },
                    {
                        "type": "AlexaFooter",
                        "footerHint": "${payload.bodyTemplate2Data.hintText}"
                    }
                ]
            }
        ]
    }
}

