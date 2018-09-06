namespace java com.sankuai.meituan.zcm.camaro.thrift

/**
 * 分页
 **/
struct TPage {
    1: required i32 currentPageNum;
    2: optional i32 totalPageNum;
    3: optional i32 totalRowCount;
    4: required i32 pageSize;
}

/**
 * 返回码
 **/
enum TReturnCode {
    SUCCESS = 200,
    FAILED = 500,
}

/**
 * 错误信息
 **/
struct TError {
    1: optional i32 code;
    2: optional string msg;
}

/**
 * boolean 类型
 **/
struct TBoolRes {
    1: required TReturnCode retCode; // 返回码
    2: optional TError error; // 错误信息
    3: optional bool data; // 返回数据
}

/**
 * int 类型
 **/
struct TIntRes {
    1: required TReturnCode retCode; // 返回码
    2: optional TError error; // 错误信息
    3: optional i32 data; // 返回数据
}

/**
 * int 类型
 **/
struct TLongRes {
    1: required TReturnCode retCode; // 返回码
    2: optional TError error; // 错误信息
    3: optional i64 data; // 返回数据
}

struct TStringRes {
    1: required TReturnCode retCode; // 返回码
    2: optional TError error; // 错误信息
    3: optional string data; // 返回数据
}

/**
 * 用户级别
 **/
enum TUserLevel {
    BD = 0,  // BD(一级)
    BDM = 1, // BDM（二级）
    CM = 2,   // CM(三级)
    RM = 3, //区域经理（四级）
    GM = 4,  //大区经理
    SM = 5, // 总部
}

/**
 * 是或否
 **/
enum TIsOrNot {
    NOT = 0, // 否
    IS = 1, // 是
}

/**
 * 产品类型
 **/
enum TProduct {
    POS = 1,  // POS
    QRC = 2, // 二维码
    SEC = 3 // 秒付
}

/**
* 敏感日志上传所需要的信息
**/
struct TUploadLogMessage {
    1: optional string userName; //mis
    2: optional string userRole; //属别 user/admin
    3: optional string systemName; //前端系统名,xx系统缩写或编码
    4: optional string appkey; //系统的appkey
    5: optional string domain; //域名
    6: optional string url;
}
