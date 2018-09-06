//
// Autogenerated by Thrift Compiler (0.9.2)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;

var commons2_ttypes = require('./commons2_types')


var ttypes = require('./customeraudit_types');
//HELPER FUNCTIONS AND STRUCTURES

var TCustomerAuditService_queryAudit_args = function(args) {
  this.auditFlowId = null;
  if (args) {
    if (args.auditFlowId !== undefined) {
      this.auditFlowId = args.auditFlowId;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field auditFlowId is unset!');
    }
  }
};
TCustomerAuditService_queryAudit_args.prototype = {};
TCustomerAuditService_queryAudit_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.auditFlowId = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

TCustomerAuditService_queryAudit_args.prototype.write = function(output) {
  output.writeStructBegin('TCustomerAuditService_queryAudit_args');
  if (this.auditFlowId !== null && this.auditFlowId !== undefined) {
    output.writeFieldBegin('auditFlowId', Thrift.Type.I32, 1);
    output.writeI32(this.auditFlowId);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var TCustomerAuditService_queryAudit_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
TCustomerAuditService_queryAudit_result.prototype = {};
TCustomerAuditService_queryAudit_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new ttypes.TAuditDetailResult();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

TCustomerAuditService_queryAudit_result.prototype.write = function(output) {
  output.writeStructBegin('TCustomerAuditService_queryAudit_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var TCustomerAuditService_queryReason_args = function(args) {
  this.attrId = null;
  if (args) {
    if (args.attrId !== undefined) {
      this.attrId = args.attrId;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field attrId is unset!');
    }
  }
};
TCustomerAuditService_queryReason_args.prototype = {};
TCustomerAuditService_queryReason_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.attrId = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

TCustomerAuditService_queryReason_args.prototype.write = function(output) {
  output.writeStructBegin('TCustomerAuditService_queryReason_args');
  if (this.attrId !== null && this.attrId !== undefined) {
    output.writeFieldBegin('attrId', Thrift.Type.I32, 1);
    output.writeI32(this.attrId);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var TCustomerAuditService_queryReason_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
TCustomerAuditService_queryReason_result.prototype = {};
TCustomerAuditService_queryReason_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new ttypes.TAuditReasonResult();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

TCustomerAuditService_queryReason_result.prototype.write = function(output) {
  output.writeStructBegin('TCustomerAuditService_queryReason_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var TCustomerAuditService_queryResonDetail_args = function(args) {
  this.customerId = null;
  if (args) {
    if (args.customerId !== undefined) {
      this.customerId = args.customerId;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field customerId is unset!');
    }
  }
};
TCustomerAuditService_queryResonDetail_args.prototype = {};
TCustomerAuditService_queryResonDetail_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I64) {
        this.customerId = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

TCustomerAuditService_queryResonDetail_args.prototype.write = function(output) {
  output.writeStructBegin('TCustomerAuditService_queryResonDetail_args');
  if (this.customerId !== null && this.customerId !== undefined) {
    output.writeFieldBegin('customerId', Thrift.Type.I64, 1);
    output.writeI64(this.customerId);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var TCustomerAuditService_queryResonDetail_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
TCustomerAuditService_queryResonDetail_result.prototype = {};
TCustomerAuditService_queryResonDetail_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new ttypes.TAuditReasonResult();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

TCustomerAuditService_queryResonDetail_result.prototype.write = function(output) {
  output.writeStructBegin('TCustomerAuditService_queryResonDetail_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var TCustomerAuditService_saveAudit_args = function(args) {
  this.req = null;
  if (args) {
    if (args.req !== undefined) {
      this.req = args.req;
    }
  }
};
TCustomerAuditService_saveAudit_args.prototype = {};
TCustomerAuditService_saveAudit_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.req = new ttypes.TSaveAuditReqDTO();
        this.req.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

TCustomerAuditService_saveAudit_args.prototype.write = function(output) {
  output.writeStructBegin('TCustomerAuditService_saveAudit_args');
  if (this.req !== null && this.req !== undefined) {
    output.writeFieldBegin('req', Thrift.Type.STRUCT, 1);
    this.req.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var TCustomerAuditService_saveAudit_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
TCustomerAuditService_saveAudit_result.prototype = {};
TCustomerAuditService_saveAudit_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new commons2_ttypes.TStringResult();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

TCustomerAuditService_saveAudit_result.prototype.write = function(output) {
  output.writeStructBegin('TCustomerAuditService_saveAudit_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var TCustomerAuditServiceClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
TCustomerAuditServiceClient.prototype = {};
TCustomerAuditServiceClient.prototype.seqid = function() { return this._seqid; }
TCustomerAuditServiceClient.prototype.new_seqid = function() { return this._seqid += 1; }
TCustomerAuditServiceClient.prototype.queryAudit = function(auditFlowId, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_queryAudit(auditFlowId);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_queryAudit(auditFlowId);
  }
};

TCustomerAuditServiceClient.prototype.send_queryAudit = function(auditFlowId) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('queryAudit', Thrift.MessageType.CALL, this.seqid());
  var args = new TCustomerAuditService_queryAudit_args();
  args.auditFlowId = auditFlowId;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

TCustomerAuditServiceClient.prototype.recv_queryAudit = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new TCustomerAuditService_queryAudit_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('queryAudit failed: unknown result');
};
TCustomerAuditServiceClient.prototype.queryReason = function(attrId, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_queryReason(attrId);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_queryReason(attrId);
  }
};

TCustomerAuditServiceClient.prototype.send_queryReason = function(attrId) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('queryReason', Thrift.MessageType.CALL, this.seqid());
  var args = new TCustomerAuditService_queryReason_args();
  args.attrId = attrId;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

TCustomerAuditServiceClient.prototype.recv_queryReason = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new TCustomerAuditService_queryReason_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('queryReason failed: unknown result');
};
TCustomerAuditServiceClient.prototype.queryResonDetail = function(customerId, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_queryResonDetail(customerId);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_queryResonDetail(customerId);
  }
};

TCustomerAuditServiceClient.prototype.send_queryResonDetail = function(customerId) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('queryResonDetail', Thrift.MessageType.CALL, this.seqid());
  var args = new TCustomerAuditService_queryResonDetail_args();
  args.customerId = customerId;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

TCustomerAuditServiceClient.prototype.recv_queryResonDetail = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new TCustomerAuditService_queryResonDetail_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('queryResonDetail failed: unknown result');
};
TCustomerAuditServiceClient.prototype.saveAudit = function(req, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_saveAudit(req);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_saveAudit(req);
  }
};

TCustomerAuditServiceClient.prototype.send_saveAudit = function(req) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('saveAudit', Thrift.MessageType.CALL, this.seqid());
  var args = new TCustomerAuditService_saveAudit_args();
  args.req = req;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

TCustomerAuditServiceClient.prototype.recv_saveAudit = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new TCustomerAuditService_saveAudit_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('saveAudit failed: unknown result');
};
var TCustomerAuditServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
TCustomerAuditServiceProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

TCustomerAuditServiceProcessor.prototype.process_queryAudit = function(seqid, input, output) {
  var args = new TCustomerAuditService_queryAudit_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.queryAudit.length === 1) {
    Q.fcall(this._handler.queryAudit, args.auditFlowId)
      .then(function(result) {
        var result = new TCustomerAuditService_queryAudit_result({success: result});
        output.writeMessageBegin("queryAudit", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new TCustomerAuditService_queryAudit_result(err);
        output.writeMessageBegin("queryAudit", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.queryAudit(args.auditFlowId,  function (err, result) {
      var result = new TCustomerAuditService_queryAudit_result((err != null ? err : {success: result}));
      output.writeMessageBegin("queryAudit", Thrift.MessageType.REPLY, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

TCustomerAuditServiceProcessor.prototype.process_queryReason = function(seqid, input, output) {
  var args = new TCustomerAuditService_queryReason_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.queryReason.length === 1) {
    Q.fcall(this._handler.queryReason, args.attrId)
      .then(function(result) {
        var result = new TCustomerAuditService_queryReason_result({success: result});
        output.writeMessageBegin("queryReason", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new TCustomerAuditService_queryReason_result(err);
        output.writeMessageBegin("queryReason", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.queryReason(args.attrId,  function (err, result) {
      var result = new TCustomerAuditService_queryReason_result((err != null ? err : {success: result}));
      output.writeMessageBegin("queryReason", Thrift.MessageType.REPLY, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

TCustomerAuditServiceProcessor.prototype.process_queryResonDetail = function(seqid, input, output) {
  var args = new TCustomerAuditService_queryResonDetail_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.queryResonDetail.length === 1) {
    Q.fcall(this._handler.queryResonDetail, args.customerId)
      .then(function(result) {
        var result = new TCustomerAuditService_queryResonDetail_result({success: result});
        output.writeMessageBegin("queryResonDetail", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new TCustomerAuditService_queryResonDetail_result(err);
        output.writeMessageBegin("queryResonDetail", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.queryResonDetail(args.customerId,  function (err, result) {
      var result = new TCustomerAuditService_queryResonDetail_result((err != null ? err : {success: result}));
      output.writeMessageBegin("queryResonDetail", Thrift.MessageType.REPLY, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

TCustomerAuditServiceProcessor.prototype.process_saveAudit = function(seqid, input, output) {
  var args = new TCustomerAuditService_saveAudit_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.saveAudit.length === 1) {
    Q.fcall(this._handler.saveAudit, args.req)
      .then(function(result) {
        var result = new TCustomerAuditService_saveAudit_result({success: result});
        output.writeMessageBegin("saveAudit", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new TCustomerAuditService_saveAudit_result(err);
        output.writeMessageBegin("saveAudit", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.saveAudit(args.req,  function (err, result) {
      var result = new TCustomerAuditService_saveAudit_result((err != null ? err : {success: result}));
      output.writeMessageBegin("saveAudit", Thrift.MessageType.REPLY, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

