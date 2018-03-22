var packageModels = {
    "Systems":{
        shapes:"CircleModel",
        level:1,
        data: {
            type:"package",
            locked:true,
            JSONData:{
                "Systems":{
                    "Your system":{}
                }
            }
        }
    },
    "Components":{
        shapes:"CircleModel",
        level:1,
        data: {
            type:"package",
            locked:true,
            JSONData:{
                "Components":{
                    'pages':{

                    }
                }
            }
        }
    },
    "Managers":{
        shapes:"CircleModel",
        level:1,
        data: {
            type:"package",
            locked:true,
            JSONData:{
                "Managers":{
                    database:{
                        methods:{
                        	connect_database:{},
	                        create_database:{},
	                        create_table:{},
	                        insert_table:{},
	                        select_table:{},
	                        update_table:{},
	                        delete_table:{},
                            drop_table:{}
                        }
                    },
                    handler:{
                        methods:{

                        }
                    },
                    ui:{
                        methods:{

                        }
                    }
                }
            }
        }
    },
    "App":{
        shapes:"CircleModel",
        level:1,
        data: {
            type:"package",
            locked:true,
            JSONData:{
                "App":{
                    "name": "",
                    "version": "",
                    "date": "",
                    "author": ""
                  }
            }
        }
    },
    "database":{
        shapes:"CircleModel",
        level:1,
        data: {
            type:"package",
            locked:true,
            image:"basic_database",
            JSONData:{
                "database":{
                    methods:{
                        connect_database:{},
                        create_database:{},
                        create_table:{},
                        insert_table:{},
                        select_table:{},
                        update_table:{},
                        delete_table:{},
                        drop_table:{}
                    }
                }
            }
        }
    },
    "handler":{
        shapes:"CircleModel",
        level:1,
        data: {
            type:"package",
            locked:true,
            image:"basic_gear",
            JSONData:{
                "handler":{
                    methods:{}
                }
            }
        }
    },
    "ui":{
        shapes:"CircleModel",
        level:1,
        data: {
            type:"package",
            locked:true,
            image:"basic_pencil_ruler",
            JSONData:{
                "ui":{
                    methods:{}
                }
            }
        }
    },
    "methods":{
        shapes:"CircleModel",
        level:1,
        data: {
            type:"package",
            locked:true,
            image:"method_setting",
            JSONData:{
                "methods":{
                    "Your method":{}
                }
            }
        }
    },
    "Your system":{
        shapes:"CircleModel",
        level:2,
        data: {
            type:"package",
            locked:false,
            JSONData:{
                "Your system":{
                    database:{
                        methods:{
                            connect_database:{},
	                        create_database:{},
	                        create_table:{},
	                        insert_table:{},
	                        select_table:{},
	                        update_table:{},
	                        delete_table:{},
                            drop_table:{}
                        }
                    },
                    handler:{
                        methods:{

                        }
                    },
                    ui:{
                        methods:{

                        }
                    }
                }
            }
        }
    },
















    "connect_database":{
        shapes:"NewRect",
        level:3,
        data: {
            type:"method",
            locked:true,
            JSONData:{
                "connect_database":{
                        "db_ip": "",
                        "db_username": "",
                        "db_password": ""
                      }
                  }
        }
    },
    "create_database":{
        shapes:"NewRect",
        level:3,
        data: {
            type:"method",
            locked:true,
            JSONData:{
                "create_database": {
                        "db_name": ""
                      }
                  }
        }
    },

    "delete_table":{
        shapes:"NewRect",
        level:3,
        data: {
            type:"method",
            locked:true,
            JSONData:{
                "delete_table":{
                    "db_name": "",
                    "db_table_name": "",
                    "db_attributes": {},
                    "db_values": {
                      "condition": ""
                    }
                }
            }
        }
    },
    "drop_table":{
        shapes:"NewRect",
        level:3,
        data: {
            type:"method",
            locked:true,
            JSONData:{
                "drop_table":{
                    "db_name": "",
                    "db_table_name": ""
                }
            }
        }
    },
    "db_attributes":{
        shapes:"NewRect",
        level:3,
        data: {
            type:"method",
            locked:true,
            JSONData:{
                "db_attributes":{
                    "id": "",
                }
            }
        }
    },
    "db_values":{
        shapes:"NewRect",
        level:3,
        data: {
            type:"method",
            locked:true,
            JSONData:{"db_values":{"condition": ""}}
        }
    },
    "create_table":{
        shapes:"NewRect",
        level:3,
        data: {
            type:"method",
            locked:true,
            image:"database_flag_icon",
            JSONData:{
                "create_table": {
                    "db_name": "",
                    "db_table_name": "",
                    "db_attributes": {},
                    "db_values": {
                      "condition": ""
                    }
                }
            }
        }
    },
    "insert_table":{
        shapes:"NewRect",
        level:3,
        data: {
            type:"method",
            locked:true,
            image:"database_insert_icon",
            JSONData:{
                "insert_table":{
                    "db_name": "",
                    "db_table_name": "",
                    "db_attributes": {},
                    "db_values": {
                      "condition": ""
                    }
                }
            }
        }
    },
    "select_table":{
        shapes:"NewRect",
        level:3,
        data: {
            type:"method",
            locked:true,
            image:"database_select_icon",
            JSONData:{
                "select_table":{
                    "db_name": "",
                    "db_table_name": "",
                    "db_attributes": {},
                    "db_values": {
                      "condition": ""
                    }
                }
            }
        }
    },
    "update_table":{
        shapes:"NewRect",
        level:3,
        data: {
            type:"method",
            locked:true,
            image:"database_update_icon",
            JSONData:{
                "update_table":{
                    "db_name": "",
                    "db_table_name": "",
                    "db_attributes": {},
                    "db_values": {
                      "condition": ""
                    }
                }
            }
        }
    },

    "Your method":{
        shapes:"NewRect",
        level:4,
        data: {
            type:"method",
            locked:false,
            JSONData:{
                "Your method":{
                    "name": "Your-method",
                    "operate": "",
                    "associate": {
                      "scope": {},
                      "condition": "",
                      "params": {},
                      "call": ""
                    },
                    "return": {},
                    "path": "",
                    "filename": "",
                    "require_once": "",
                    "params": {}
                  }
            }
        }
    },
    "associate":{
        shapes:"NewRect2",
        level:4,
        data: {
            type:"method",
            locked:true,
            JSONData:{
                "associate":{
                    "scope": {},
                    "params": {
			            "key": "''",
			            "value": "$value"
			          },
                    "call": ""
                }
            }
        }
    },
    "scope":{
        shapes:"NewRect",
        level:4,
        data: {
            type:"method",
            locked:true,
            JSONData:{"scope":{}}
        }
    },
    "params":{
        shapes:"NewRect",
        level:4,
        data: {
            type:"method",
            locked:true,
            JSONData:{
                "params":{
                        "key": "''",
                        "value": "$value"
                      }
            }
        }
    },
    "return":{
        shapes:"NewRect",
        level:4,
        data: {
            type:"method",
            locked:true,
            JSONData:{
                "return":{
                      "value": "string"
                    }
            }
        }
    },


// database svg model

    "database_":{
        shapes:"GenericModel",
        level:5,
        data: {
            type:"gmethod",
            locked:false,
            image:"databaseIcon",
            JSONData:{
                "Your method":{
                    "name": "Your-method",
                    "operate": "",
                    "associate": {
                      "scope": {},
                      "condition": "",
                      "params": {},
                      "call": ""
                    },
                    "return": {},
                    "path": "",
                    "filename": "",
                    "require_once": "",
                    "params": {}
                  }
            }
        }
    },

    "database__":{
        shapes:"GenericModel",
        level:5,
        data: {
            type:"gmethod",
            locked:false,
            image:"basic_database",
            JSONData:{
                "create_table":{
                    "db_name": "",
                    "db_table_name": "",
                    "db_attributes": {},
                    "db_values": {
                      "condition": ""
                    }
                }
            }
        }
    },

    "database_update":{
        shapes:"GenericModel",
        level:5,
        data: {
            type:"gmethod",
            locked:false,
            image:"database_update_icon",
            JSONData:{
                "update_table":{
                    "db_name": "",
                    "db_table_name": "",
                    "db_attributes": {},
                    "db_values": {
                      "condition": ""
                    }
                }
            }
        }
    },

    "database_search":{
        shapes:"GenericModel",
        level:5,
        data: {
            type:"gmethod",
            locked:false,
            image:"database_select_icon",
            JSONData:{
                "select_table":{
                    "db_name": "",
                    "db_table_name": "",
                    "db_attributes": {},
                    "db_values": {
                      "condition": ""
                    }
                }
            }
        }
    },

    "database_cloud":{
        shapes:"GenericModel",
        level:5,
        data: {
            type:"gmethod",
            locked:false,
            image:"basic_server_cloud",
            JSONData:{
                "insert_table":{
                    "db_name": "",
                    "db_table_name": "",
                    "db_attributes": {},
                    "db_values": {
                      "condition": ""
                    }
                }
            }
        }
    },

    "database_flag":{
        shapes:"GenericModel",
        level:5,
        data: {
            type:"gmethod",
            locked:false,
            image:"database_flag_icon",
            JSONData:{
                "delete_table":{
                    "db_name": "",
                    "db_table_name": "",
                    "db_attributes": {},
                    "db_values": {
                      "condition": ""
                    }
                }
            }
        }
    },

    "database_insert":{
        shapes:"GenericModel",
        level:5,
        data: {
            type:"gmethod",
            locked:false,
            image:"database_insert_icon",
            JSONData:{
                "insert_table":{
                    "db_name": "",
                    "db_table_name": "",
                    "db_attributes": {},
                    "db_values": {
                      "condition": ""
                    }
                }
            }
        }
    },


    "pages":{
        shapes:"GenericModel",
        level:6,
        data: {
            type:"gmethod",
            locked:false,
            image:"newspaper",
            JSONData:{
                    "pages":{
                        image:{},
                        sound:{},
                        video:{},
                        sheet:{},
                        message:{},
                        mail:{},
                        home:{},
                        lock:{}
                    }
                }
            }

    },
    "image":{
        shapes:"GenericModel",
        level:6,
        data: {
            type:"gmethod",
            locked:false,
            image:"basic_picture_multiple",
            JSONData:{
                "image":{}
                }
            }

    },
    "sound":{
        shapes:"GenericModel",
        level:6,
        data: {
            type:"gmethod",
            locked:false,
            image:"music",
            JSONData:{
                "sound":{}
                }
            }

    },
    "video":{
        shapes:"GenericModel",
        level:6,
        data: {
            type:"gmethod",
            locked:false,
            image:"basic_video",
            JSONData:{
                "video":{}
                }
            }

    },
    "sheet":{
        shapes:"GenericModel",
        level:6,
        data: {
            type:"gmethod",
            locked:false,
            image:"basic_sheet_txt",
            JSONData:{
                "sheet":{}
                }
            }

    },
    "message":{
        shapes:"GenericModel",
        level:6,
        data: {
            type:"gmethod",
            locked:false,
            image:"basic_message_txt",
            JSONData:{
                "message":{}
                }
            }

    },
    "mail":{
        shapes:"GenericModel",
        level:6,
        data: {
            type:"gmethod",
            locked:false,
            image:"basic_mail_open_text",
            JSONData:{
                "mail":{}
                }
            }

    },



    "designUI":{
        shapes:"GenericModel",
        level:7,
        data: {
            type:"gmethod",
            locked:false,
            image:"basic_pencil_ruler",
            JSONData:{
                "designUI":{}
                }
            }

    },

    "basic_rss":{
        shapes:"GenericModel",
        level:7,
        data: {
            type:"gmethod",
            locked:false,
            image:"basic_rss",
            JSONData:{
                "basic_rss":{}
                }
            }

    },

    "basic_gear":{
        shapes:"GenericModel",
        level:7,
        data: {
            type:"gmethod",
            locked:false,
            image:"basic_gear",
            JSONData:{
                "basic_gear":{}
                }
            }

    },


    "basic_cloud":{
        shapes:"GenericModel",
        level:7,
        data: {
            type:"gmethod",
            locked:false,
            image:"basic_compass",
            JSONData:{
                "basic_cloud":{}
                }
            }

    },

    "home":{
        shapes:"GenericModel",
        level:7,
        data: {
            type:"gmethod",
            locked:false,
            image:"home",
            JSONData:{
                "home":{}
                }
            }

    },

    "lock":{
        shapes:"GenericModel",
        level:7,
        data: {
            type:"gmethod",
            locked:false,
            image:"lock",
            JSONData:{
                "home":{}
                }
            }

    }




    //end {}
}