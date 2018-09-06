include "commons.thrift"
include "commons2.thrift"

namespace java com.sankuai.meituan.zcm.camaro.thrift.customer

/**
 * 客户状态码
 **/
enum TCustomerStatus {
    NEW = 1, // 新创建 保存
    WAIT_AUDIT = 2, // 等待审核
    AUDIT_UNPASS = 3, // 审核拒绝未通过
    AUDIT_PASS = 4, // 审核通过
    NORMAL = 5, // 已正常
    DELETE = 9, // 已删除
}

/**
* 迁移客户类型
**/
enum TMigrationCustomerType {
    HAVE_MERCHANT = 1, //有客户资质
    NO_MERCHANT = 2, //无客户资质
}

/**
* 认证方式
**/
enum TAuthenticationType {
    PHONE = 1, //手机号认证
    BANK_CARD = 2, //银行卡认证
}

/**
* 签约人类型
**/
enum TSignPersonType {
    LEGAL_PERSON = 1, //法人签约
    AUTHORIZATION_PERSON = 2, //授权人签约
    SELF_PERSON = 3, //本人签约
}

/**
* 实名状态
**/
enum TRealNameStatus {
    NO_REAL_NAME = 1, //未实名
    AUDIT = 2, //审核中
    AUDIT_REJECT = 3, //审核驳回
    HAVE_REAL_NAME = 4, //已实名
}


struct TAttachment {
    1: required i32 type; //附件类型
    2: required string attachment; // 附件下载地址
}


/**
 * 企业资质信息
 **/
struct TCompanyQualification {
    1: required string regAddress; // 注册地址（营业执照）
    2: required string qualPic; // 营业执照图片
    3: optional string taxCard; // 税务登记证图片
    4: optional string orgCodeCard;// 组织机构代码证图片
    5: optional string corpIdcardName; // 负责人姓名 法人或者个人
    6: optional i32 idcardType; // 证件类型
    7: optional string idcardNo; // 证件号码
    8: optional string idcardFrontPhoto; // 证件图片正面
    9: optional string idcardBackPhoto; // 证件图片反面
    20: optional i32 deadlineType; // 截止日期类型
    21: optional string deadlineDate; // 截止日期
    22: optional string businessLicensePhoto;
    23: optional string businessScope; // 营业范围
}

/**
 *个人资质信息
 *
 */
struct TPersonalQualification {
    1: optional string idcardFrontPhoto; // 证件图片正面
    2: optional string idcardBackPhoto; // 证件图片反面
}

/**
 *认证信息
 *
 */
struct TAuthenticationMessage {
    1: optional TAuthenticationType authenticationType; //认证方式
    2: optional TSignPersonType signPersonType; // 签约人类型
    3: optional string phone; // 手机号码
    4: optional string name; // 姓名
    5: optional string idcardNo; // 身份证号
    6: optional string bankCardNo; // 银行卡号
    7: optional string bankCardPhone; // 银行卡预留手机号
    8: optional string authFileUrl; // 授权书图片URL
    9: optional string authorizerIdcardFrontUrl; //授权人身份证正面图片url
   10: optional string authorizerIdcardBackUrl; //授权人身份证反面图片url
}

/**
 *客户认证信息
 *
 */
struct TCustomerAuthenticationMessage {
    1: optional i64 customerId; //客户id
    2: optional TRealNameStatus realNameStatus; //实名状态
    3: optional TAuthenticationType authenticationType; //认证方式
    4: optional TSignPersonType signPersonType; // 签约人类型
    5: optional string phone; // 手机号码
    6: optional string name; // 姓名
    7: optional string idcardNo; // 身份证号
    8: optional string bankCardNo; // 银行卡号
    9: optional string authFileUrl; // 授权书图片URL
   10: optional string authorizerIdcardFrontUrl; //授权人身份证正面图片url
   11: optional string authorizerIdcardBackUrl; //授权人身份证反面图片url
}



/**
 * 收单客户
 **/
struct TCustomerDTO {
    1: optional i64 id; // customer id
    2: required i32 type;//客户类型 2 个人客户 1 企业客户 0 空客户
    3: required string qualName; //资质名称
    4: required i32 qualType; // 资质类型  资质名称 101 102 201 202 -1(空客户使用 未知类型)
    5: required string qualCode; // 资质编号
    6: optional TCustomerStatus status; // 状态
    7: optional i32 isValid; //是否有效 0 无效 1 有效
    8: optional i32 isIetegrality; // 是否完整
    9: optional i32 deadlineType; // 0-永久 1-截止日期
    10: optional string deadlineDate; // 截止日期
    11: optional TCompanyQualification companyQualification;//企业资质信息
    12: optional TPersonalQualification personalQualification;//个人资质信息
    13: optional i32 migrateFlag;//迁移标志 1 迁移过来的 0 本平台产生的
    14: optional i64 migrateId;//原始id
    15: optional i32 source;//来源 0 迁移 1 pc 2 app
    16: optional TAuthenticationMessage authenticationMessage; //认证相关信息
    17: optional TRealNameStatus realNameStatus; //实名状态
    18: optional string rejectReason; //驳回原因
}

/**
 * 收单客户-simple
 **/
struct TCustomerStatusAndTypeDTO {
    1: optional i64 id; // customer id
    2: optional i32 type;//客户类型 2 个人客户 1 企业客户 0 空客户
    3: optional TRealNameStatus realNameStatus; //实名状态
}


/**
 * 收单客户返回结果
 **/
struct TCustomerResDTO {
    1: required commons.TReturnCode retCode; // 返回码
    2: optional commons.TError error; // 错误信息
    3: optional TCustomerDTO data; // 返回数据
}

/**
 * 收单客户返回结果-simple
 **/
struct TCustomerStatusAndTypeResDTO {
    1: required bool success;  // 返回码
    2: optional commons2.TStatus status; // 错误信息
    3: optional TCustomerStatusAndTypeDTO data; // 返回数据
}


/**
 * 查询参数
 **/
struct TCustomerQueryParam {
    1: optional TCustomerStatus status;
    2: optional i32 isValid;
    3: optional string name;
    4: optional i32 pageNum;
    5: optional i32 pageSize;
}

struct TCustomerPageDTO {
    1: optional list<TCustomerDTO> data; // 返回数据list
    2: optional commons.TPage page;
}

struct TCustomerListDTO {
    1: optional list<TCustomerDTO> data; // 返回数据list
}

/**
 * 收单客户返回结果-列表
 **/
struct TCustomerPageResDTO {
    1: required commons.TReturnCode retCode; // 返回码
    2: optional commons.TError error; // 错误信息
    3: optional TCustomerPageDTO data; // 返回数据
}

/**
 * 收单客户返回结果-列表
 **/
struct TCustomerListResDTO {
    1: required commons.TReturnCode retCode; // 返回码
    2: optional commons.TError error; // 错误信息
    3: optional TCustomerListDTO data; // 返回数据
}

/**
 * 商户和门店
 **/
struct TBizUserDTO {
    1: required i32 id; // bizUserId
    2: required i32 shopId;//门店id
    3: required string shopName; //门店名称
}

struct TBizUserListDTO {
    1: optional list<TBizUserDTO> data; // 返回数据list
}

/**
 * 收单客户返回结果
 **/
struct TBizUserResDTO {
    1: required commons.TReturnCode retCode; // 返回码
    2: optional commons.TError error; // 错误信息
    3: optional TBizUserListDTO data; // 返回数据
}

/**
* ES资质
**/
struct TEsMerchantDTO {
    1: required i64 id; // customerId
    2: optional string bizLicence;//资质编号
    3: optional string bizName; //资质名称
}

struct TEsMerchantListDTO {
    1: optional list<TEsMerchantDTO> data; // 返回数据list
}

/**
 * 根据资质编号或者资质名称检索ES资质
 **/
struct TEsMerchantResDTO {
    1: required commons.TReturnCode retCode; // 返回码
    2: optional commons.TError error; // 错误信息
    3: optional TEsMerchantListDTO data; // 返回数据
}

/**
 * 收单客户-门店归属变更
 **/
struct TCustomerForShopChangeDTO {
    1: optional i64 id; // customer id
    2: optional string name;//客户名称
    3: required string qualCode; // 资质编号
}

/**
 * 收单客户返回结果-门店归属变更
 **/
struct TCustomerResForShopChangeDTO {
    1: required commons.TReturnCode retCode; // 返回码
    2: optional commons.TError error; // 错误信息
    3: optional TCustomerForShopChangeDTO data; // 返回数据
}

struct TCustomer {
    1: required i64 id; // customerId
    2: optional i32 code; // 错误码
    3: optional string msg; // 错误信息
}

struct TCustomerRes {
    1: required commons.TReturnCode retCode; // 返回码
    2: optional commons.TError error; // 错误信息
    3: optional TCustomer data; // 返回数据
}

struct TCustomerAuthenticationMessageRes {
    1: required bool success;  // 返回码
    2: optional commons2.TStatus status; // 错误信息
    3: optional TCustomerAuthenticationMessage data; // 返回数据
}


service TCustomerService{

     /**
      * 获取应用于编辑的客户列表， 客户信息为最后一次编辑的信息
      * 客户包括创建 审核 有效 以及再次变更的客户
      * Customer 收单客户信息
      * user  操作人
      **/
     TCustomerPageResDTO listCustomers(1: optional TCustomerQueryParam param, 2: optional commons.TUploadLogMessage uploadLogMessage);

     /**
      * 获取最新编辑的收单客户信息
      * customerId 收单客户id
      **/
     TCustomerResDTO getCustomer(1: required i64 customerId, 2: optional commons.TUploadLogMessage uploadLogMessage);

     /**
      * 根据customerid 批量获取customer
      * customerIds 客户id list
      **/
     TCustomerListResDTO getCustomerBatch(1: required list<i64> customerIds, 2: optional commons.TUploadLogMessage uploadLogMessage);

     /**
      * 根据资质获取客户信息
      * 有可能没有customerId 只有资质信息
      * 没有customerId 即此资质在金融客户存在，需要绑定金融客户
      * qualificationNumber 资质编号
      **/
     TCustomerResDTO checkQualification(1: required string qualCode, 2: optional commons.TUploadLogMessage uploadLogMessage);

     /**
      * 查找一个客户 编号和名称至少要填一个 type如果需要全部检索可以填-1
      * qualCode 资质编号
      * qualName 资质名称
      * type 客户类型  0 空客户 1 企业客户 2 个人客户  -1 全部
      */
     TCustomerListResDTO  searchCustomer(1: optional string qualCode, 2: optional string qualName, 3: optional i32 type, 4: optional commons.TUploadLogMessage uploadLogMessage);

     /**
      * 保存一个收单客户
      * Customer 收单客户信息
      * user  操作人
      * userType 用户类型 1 BD 2 商家
      **/
     commons.TLongRes saveCustomer(1: required TCustomerDTO customer, 2: required string user, 3: required byte userType, 4: optional commons.TUploadLogMessage uploadLogMessage);

     /**
      * 保存一个收单客户 和上单进行绑定
      * Customer 收单客户信息
      * user  操作人
      * userType 用户类型 1 BD 2 商家
      * bizUserId
     **/
     commons.TLongRes saveCustomerWithShopId(1: required TCustomerDTO customer, 2: required string user, 3: required byte userType, 4: optional i32 shopId, 5: optional commons.TUploadLogMessage uploadLogMessage);

     /**
      * 保存一个收单客户 和上单进行绑定
      * Customer 收单客户信息
      * user  操作人
      * userType 用户类型 1 BD 2 商家
      * bizUserId
      **/
     TCustomerRes saveCustomerWithShopIdApp(1: required TCustomerDTO customer, 2: required string user, 3: required byte userType, 4: optional i32 shopId, 5: optional commons.TUploadLogMessage uploadLogMessage);

     /**
      * 创建空客户
      * user  操作人
      * userType 用户类型 1 BD 2 商家
      **/
     commons.TLongRes createEmptyCustomer(1: required string user, 2: required byte userType);

     /**
      * 创建空客户
      * user  操作人
      * userType 用户类型 1 BD 2 商家
      **/
     commons.TLongRes createEmptyCustomerWithShopId(1: required string user, 2: required byte userType, 3: optional i32 shopId);

     /**
      * 提交审核 //待定 是否需要
      * customerId 收单客户id
      * user  操作人
      * userType 用户类型 1 BD 2 商家
      **/
     commons.TBoolRes submitAudit(1: required i64 customerId, 2: required string user, 3: required byte userType );

     /**
      * 审核撤回
      * customerId 收单客户id
      * user  操作人
      * userType 用户类型 1 BD 2 商家
      **/
     commons.TBoolRes recallAudit(1: required i64 customerId, 2: required string user, 3: required byte userType);

     /**
      * 审核通过
      * customerId 收单客户id
      * user  操作人
      * userType 用户类型 1 BD 2 商家
      **/
     commons.TBoolRes auditPass(1: required i64 customerId, 2: required string user, 3: required byte userType);

     /**
      * 审核失败拒绝
      * customerId 收单客户id
      * reason 审核理由
      * user  操作人
      * userType 用户类型 1 BD 2 商家
      **/
     commons.TBoolRes auditFail(1: required i64 customerId, 2: required string user, 3: required byte userType, 4: required string reason);

     /**
      * 删除一个收单客户
      * customerId 收单客户id
      **/
     commons.TBoolRes abandonCustomer(1: required i64 customerId , 2: optional commons.TUploadLogMessage uploadLogMessage);

     /**
      * 获取有效的客户列表
      * 创建审核成功或者最后一次变更审核成功的客户信息
      * Customer 收单客户信息
      * user  操作人
      **/
     TCustomerPageResDTO listCustomersValid(1: optional TCustomerQueryParam param, 2: optional commons.TUploadLogMessage uploadLogMessage);

     /**
      * 查找已经生效的客户
      * qualCode 资质编号
      * name 客户名称
      */
     TCustomerListResDTO  searchCustomerValid(1: optional string qualCode, 2: optional string name, 3: optional commons.TUploadLogMessage uploadLogMessage);

     /**
      * 获取有效的收单客户信息
      * 创建审核成功或者最后一次变更审核成功的客户信息
      * customerId 收单客户id
      **/
     TCustomerResDTO getCustomerValid(1: required i64 customerId, 2: optional commons.TUploadLogMessage uploadLogMessage);

     /**
      * 获取有效或者新建的收单客户信息
      * 创建审核成功或者最后一次变更审核成功的客户信息
      * customerId 收单客户id
      **/
     TCustomerResDTO getCustomerValidOrNew(1: required i64 customerId, 2: optional commons.TUploadLogMessage uploadLogMessage);

     /**
      *迁移客户
      * customerId 供应链客户customer的id
      * migrationCustomerType 迁移类型
      **/
     commons.TBoolRes migrationCustomer(1: required i64 customerId, 2: required TMigrationCustomerType migrationCustomerType);

     /**
      *  根据客户获取门店
     **/
     TBizUserResDTO getBizUserByCustomerId(1: required i64 customerId);

     /**
      * 绑定一个门店和客户id
     **/
     commons.TBoolRes bindCustomer(1: required i32 shopId, 2: required i64 targetCustomerId);

     /**
      * 把一个客户迁移到另外一个客户
     **/
     commons.TBoolRes moveCustomer(1: required i64 sourceCustomerId, 2: required i64 targetCustomerId);

     /**
      * 预填一个客户信息
      * 如果有客户返回客户
      * 如果没有客户返回预填资质
      **/
     TCustomerResDTO preFillCustomer(1: required string qualCode, 2: optional commons.TUploadLogMessage uploadLogMessage);

     /**
      * 把资质添加到ES
     **/
     commons.TBoolRes addMerchantToES(1: required i64 customerId, 2: optional string bizLicence, 3: optional string bizName);

     /**
      * 根据资质名称查询ES资质
      **/
     TEsMerchantResDTO getEsMerchantByBizName(1: required string bizName, 2: optional commons.TUploadLogMessage uploadLogMessage);

     /**
      * 根据资质编号查询ES资质
      **/
     TEsMerchantResDTO getEsMerchantByBizLicence(1: required string bizLicence, 2: optional commons.TUploadLogMessage uploadLogMessage);

     /**
      * 查找一个客户-门店归属变更
      * qualCode 资质编号
      * type 客户类型  1企业客户  2个人客户
      */
     TCustomerResForShopChangeDTO  searchCustomerForShopChange(1: required string qualCode, 2: required i32 type, 3: optional commons.TUploadLogMessage uploadLogMessage);


      /**
       * 保存一个收单客户 和上单进行绑定-增加实名认证
       * Customer 收单客户信息
       * user  操作人
       * userType 用户类型 1 BD 2 商家
       * shopId 门店id
       * uploadLogMessage 客户端环境信息
       **/
      TCustomerRes saveCustomerWithAuth(1: required TCustomerDTO customer, 2: required string user, 3: required byte userType, 4: optional i32 shopId, 5: optional commons.TUploadLogMessage uploadLogMessage);

      /**
        * 获取最新编辑的收单客户信息-增加实名认证
        * customerId 收单客户id
        **/
       TCustomerResDTO getCustomerWithAuth(1: required i64 customerId, 2: optional commons.TUploadLogMessage uploadLogMessage);

      /**
        * 预填一个客户信息-增加实名认证
        * 如果有客户返回客户
        * 如果没有客户返回预填资质
        **/
       TCustomerResDTO preFillCustomerWithAuth(1: required string qualCode, 2: optional commons.TUploadLogMessage uploadLogMessage);

       /**
       * 获取客户类型及实名状态-增加实名认证
       * customerId 收单客户id
       **/
      TCustomerStatusAndTypeResDTO getCustomerStatusAndType(1: required i64 customerId);

      /**
       * 获取客户认证信息
       * customerId 收单客户id
       **/
      TCustomerAuthenticationMessageRes getCustomerAuthenticationMessage(1: required i64 customerId);
}