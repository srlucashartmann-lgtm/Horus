import { NextRequest, NextResponse } from 'next/server';
import { getNotifications, getUnreadCount, createNotification, markAllAsRead, clearAllNotifications } from 'utils/notifications-db';

export async function GET() {
  try {
    const notifications = getNotifications();
    const unreadCount = getUnreadCount();
    return NextResponse.json({ notifications, unreadCount });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, severity, title, message, link, icon } = body;

    if (!type || !severity || !title || !message) {
      return NextResponse.json({ error: 'Campos obrigatórios: type, severity, title, message' }, { status: 400 });
    }

    const notification = createNotification({ type, severity, title, message, link, icon });
    return NextResponse.json({ notification }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH() {
  try {
    const count = markAllAsRead();
    return NextResponse.json({ success: true, markedCount: count });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    clearAllNotifications();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
