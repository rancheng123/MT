namespace java com.sankuai.meituan.zcm.camaro.thrift.common

/**
 * 状态信息
 **/
struct TStatus {
    1: optional string code; // 状态码
    2: optional string msg; // 状态消息
}

/**
 * 分页
 **/
struct TPage {
    1: optional i32 total; // 总条目数
    2: optional i32 offset; // 偏移量
    3: optional i32 limit; // 每页条数
}

/**
 * boolean（bool）的返回结果
 **/
struct TBoolResult {
    1: required bool success; // true or false
    2: optional TStatus status; // 状态码
    3: optional bool data; // 结果集
}

/**
 * int（i32）的返回结果
 **/
struct TIntResult {
    1: required bool success; // true or false
    2: optional TStatus status; // 状态码
    3: optional i32 data; // 结果集
}

/**
 * long（i64）的返回结果
 **/
struct TLongResult {
    1: required bool success; // true or false
    2: optional TStatus status; // 状态码
    3: optional i64 data; // 结果集
}

/**
 * string的返回结果
 **/
struct TStringResult {
    1: required bool success; // true or false
    2: optional TStatus status; // 状态码
    3: optional string data; // 结果集
}
