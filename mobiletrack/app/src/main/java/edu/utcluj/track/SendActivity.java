package edu.utcluj.track;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Handler;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;

import java.lang.ref.WeakReference;

import java.net.HttpURLConnection;
import java.net.URL;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class SendActivity extends AppCompatActivity implements View.OnClickListener {
    private final Executor executor = Executors.newFixedThreadPool(1);
    private volatile Handler msgHandler;

    private String latitudeToSend;
    private String longitudeToSend;

    private static final String[] INITIAL_PERMS = {
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_WIFI_STATE
    };

    private static final int INITIAL_REQUEST = 1337;

    private static final String STATIC_LOCATION = "{" +
            "\"terminalId\":\"%s\"," +
            "\"latitude\":\"%s\"," +
            "\"longitude\":\"%s\"" +
            "}";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_send);

        Button sendButton = findViewById(R.id.button_send);
        sendButton.setOnClickListener(this);

        msgHandler = new MsgHandler(this);

        if (!canAccessLocation() || !canAccessWifi()) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                requestPermissions(INITIAL_PERMS, INITIAL_REQUEST);
            }
        }
    }

    private boolean canAccessLocation() {
        return (hasPermission(Manifest.permission.ACCESS_FINE_LOCATION));
    }

    private boolean canAccessWifi() {
        return (hasPermission(Manifest.permission.ACCESS_WIFI_STATE));
    }

    @SuppressLint("NewApi")
    private boolean hasPermission(String perm) {
        return PackageManager.PERMISSION_GRANTED == checkSelfPermission(perm);
    }

    public void onClick(View v) {
        executor.execute(() -> {
            Message msg = msgHandler.obtainMessage();

            WifiManager wifiManager = (WifiManager) getApplicationContext().getSystemService(Context.WIFI_SERVICE);
            WifiInfo wInfo = wifiManager.getConnectionInfo();
            @SuppressLint({"MissingPermission", "HardwareIds"}) String macAddress = wInfo.getMacAddress();

            LocationManager lm = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
            @SuppressLint("MissingPermission") Location location = lm.getLastKnownLocation(LocationManager.GPS_PROVIDER);
            double longitude = location.getLongitude();
            double latitude = location.getLatitude();

            latitudeToSend = String.valueOf(latitude);
            longitudeToSend = String.valueOf(longitude);

            msg.arg1 = sendCoordinates(macAddress, latitudeToSend, longitudeToSend) ? 1 : 0;
            msgHandler.sendMessage(msg);
        });
    }

    private boolean sendCoordinates(String terminalId, String lat, String lng) {
        HttpURLConnection con = null;
        try {
            URL obj = new URL("http://10.0.2.2:8082/positions/create");

            con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("User-Agent", "Mozilla/5.0");
            con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            con.setDoOutput(true);

            OutputStream os = con.getOutputStream();
            os.write(String.format(STATIC_LOCATION, terminalId, lat, lng).getBytes());
            os.flush();
            os.close();

            int responseCode = con.getResponseCode();

            if (responseCode == HttpURLConnection.HTTP_OK) { //success
                BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
                String inputLine;
                StringBuilder response = new StringBuilder();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }

                in.close();

                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            if (con != null) {
                con.disconnect();
            }
        }
    }


    private static class MsgHandler extends Handler {
        private final WeakReference<Activity> sendActivity;

        public MsgHandler(Activity activity) {
            sendActivity = new WeakReference<>(activity);
        }

        @Override
        public void handleMessage(Message msg) {
            if (msg.arg1 == 1) {
                Toast.makeText(sendActivity.get().getApplicationContext(), "Success!", Toast.LENGTH_LONG).show();
            } else {
                Toast.makeText(sendActivity.get().getApplicationContext(), "Error!", Toast.LENGTH_LONG).show();
            }
        }
    }
}