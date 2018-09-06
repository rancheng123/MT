include "commons2.thrift"

namespace java com.sankuai.meituan.zcm.camaro.thrift.customeraudit


/**
 * 审核项对象
 */
struct TAuditItemDTO {
    1: optional i32 attrId; // 属性ID
    2: optional string attrName; //属性名称
    3: optional string attrValue; // 属性值
    4: optional string attrDisplay; // 属性展示值
    5: optional string attrDesc; // 属性描述
}

/**
 * 图片对象
 **/
struct TPhotoItemDTO {
    1: optional i32 photoType; // 图片类型
    2: optional string photoName; // 图片名称
    3: optional list<string> photoUrls; // 图片地址
}

/**
* 审核详情
**/
struct TAuditDetailDTO {
    1: optional i32 status; // 审核状态：2 未审核 3审核未通过 4 审核通过 9 已删除
    2: optional list<TAuditItemDTO> auditItems; // 审核项列表
    3: optional list<TPhotoItemDTO> photoItems; // 图片列表
}


/**
 * 审核页面返回结果
 **/
struct TAuditDetailResult {
    1: required bool success;  // 返回码
    2: optional commons2.TStatus status; // 错误信息
    3: optional TAuditDetailDTO data; // 返回数据
}

/**
 * 审核原因返回结果
 **/
struct TAuditReasonDTO {
    1: required i32 reasonId; // 返回码
    2: required string content; // 描述
}

/**
 * 审核原因返回结果
 **/
struct TAuditReasonResult {
    1: required bool success;  // 返回码
    2: optional commons2.TStatus status; // 错误信息
    3: required list<TAuditReasonDTO> data; // 返回数据
}

/**
 * 审核结果对象
 */
struct TAuditResultDTO {
    1: optional i32 attrId;//属性ID
    2: optional list<i32> rejectReasonIds;//驳回类型
    3: optional string auditNote;//备注
}

struct TSaveAuditReqDTO {
	1: optional i32 auditFlowId;
    2: optional list<TAuditResultDTO> items;
    3: optional i32 auditUser;
    4: optional i32 needNext;
}

/**
 * 审核服务
 */
service TCustomerAuditService {

    /**
     * 审核页面展示
     * 审核流程id
     **/
    TAuditDetailResult queryAudit(1: required i32 auditFlowId);

    /**
    * 审核驳回原因获取
    **/
    TAuditReasonResult queryReason(1: required i32 attrId);

    /**
    * 获取客户具体驳回原因
    * customerId 客户id
    **/
    TAuditReasonResult queryResonDetail(1: required i64 customerId );

    /**
     * 审核页面保存
     */
    commons2.TStringResult  saveAudit(1: optional TSaveAuditReqDTO req);
}