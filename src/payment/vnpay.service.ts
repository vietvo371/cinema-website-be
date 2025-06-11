import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import * as querystring from 'querystring';

@Injectable()
export class VNPayService {
  constructor(private configService: ConfigService) {}

  createPaymentUrl(orderId: string, amount: number, orderInfo: string): string {
    const date = new Date();
    const createDate = date.toISOString().split('T')[0].split('-').join('') + 
                      date.toTimeString().split(' ')[0].split(':').join('');

    const tmnCode = this.configService.get('vnpay.tmn_code');
    const secretKey = this.configService.get('vnpay.hash_secret');
    const vnpUrl = this.configService.get('vnpay.url');
    const returnUrl = this.configService.get('vnpay.return_url');

    const currCode = 'VND';
    const locale = 'vn';

    const params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: 'other',
      vnp_Amount: amount * 100, // Convert to VND cents
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: '127.0.0.1',
      vnp_CreateDate: createDate,
    };

    const sortedParams = this.sortObject(params);
    const signData = querystring.stringify(sortedParams, undefined, undefined);
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    sortedParams['vnp_SecureHash'] = signed;

    return `${vnpUrl}?${querystring.stringify(sortedParams, undefined, undefined)}`;
  }

  verifyReturnUrl(query: any): boolean {
    const secretKey = this.configService.get('vnpay.hash_secret');
    const secureHash = query.vnp_SecureHash;

    delete query.vnp_SecureHash;
    delete query.vnp_SecureHashType;

    const sortedQuery = this.sortObject(query);
    const signData = querystring.stringify(sortedQuery, undefined, undefined);
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    return secureHash === signed;
  }

  private sortObject(obj: any): any {
    const sorted: any = {};
    const keys = Object.keys(obj).sort();

    for (const key of keys) {
      if (obj[key]) {
        sorted[key] = obj[key];
      }
    }

    return sorted;
  }
} 